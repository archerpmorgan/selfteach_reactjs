import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";
import { blobConfig } from "../config.js"

const blobfig = blobConfig();
// console.log(blobfig);
const sharedKeyCredential = new StorageSharedKeyCredential(blobfig.blobAccountName, blobfig.blobAccountKey);

export const blobServiceClient = new BlobServiceClient(
// When using AnonymousCredential, following url should include a valid SAS or support public access
`https://${blobfig.blobAccountName}.blob.core.windows.net`,
sharedKeyCredential
);

// List containers
let i = 1;
for await (const container of blobServiceClient.listContainers()) {
// console.log(`Container ${i++}: ${container.name}`);
}

const containerClient = blobServiceClient.getContainerClient("bookcovers");

// List blobs
i = 1;
for await (const blob of containerClient.listBlobsFlat()) {
    // console.log(`Blob ${i++}: ${blob.name}`);
}

  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const blockBlobClient = containerClient.getBlockBlobClient("ladr.jpeg");
  const downloadBlockBlobResponse = await blockBlobClient.download(0);
//   console.log(
//     "Downloaded blob content",
//     downloadBlockBlobResponse
//   );

// A helper method used to read a Node.js readable stream into a Buffer
async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}
