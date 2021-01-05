const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
import { blobConfig } from "../config.js"

const blobfig = blobConfig();
console.log(blobfig);
const sharedKeyCredential = new StorageSharedKeyCredential(blobfig.blobAccountName, blobfig.blobAccountKey);

export const blobServiceClient = new BlobServiceClient(
    // When using AnonymousCredential, following url should include a valid SAS or support public access
    `https://${blobfig.blobAccountName}.blob.core.windows.net`,
    sharedKeyCredential
  );

  let i = 1;
  for await (const container of blobServiceClient.listContainers()) {
    console.log(`Container ${i++}: ${container.name}`);
  }