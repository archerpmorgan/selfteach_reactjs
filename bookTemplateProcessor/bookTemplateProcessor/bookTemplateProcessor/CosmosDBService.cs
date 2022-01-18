using System;
using System.ComponentModel.Design;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Linq;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace bookTemplateProcessor
{
    public class CosmosDBService
    {
        private static string subscriptionId =
        "8b589f4d-d2e0-440f-8b15-c54222f204c1";
        private static string resourceGroupName =
        "armorgan-rg";
        private static string accountName =
        "selfteachdev";
        private static string cosmosDbEndpoint =
        "https://selfteachdev.documents.azure.com:443/";
        private static string databaseName =
        "userdata";
        private static string containerName =
        "archer";

        // HttpClient is intended to be instantiated once, rather than per-use.
        private static HttpClient httpClient = new HttpClient();
        private static CosmosClient client;

        public async Task PostBook(Book book)
        {
            var database = client.GetDatabase(databaseName);
            var container = database.GetContainer(containerName);
            try
            {
                var response = await container.CreateItemAsync<Book>(book);
            } catch (Exception ex)
            {
                string message = ex.Message;
            }
        }

        public async Task Initialize()
        {
            // AzureServiceTokenProvider will help us to get the Service Managed token.
            var azureServiceTokenProvider = new AzureServiceTokenProvider();

            // Authenticate to the Azure Resource Manager to get the Service Managed token.
            string accessToken = await azureServiceTokenProvider.GetAccessTokenAsync("https://management.azure.com/");

            // Setup the List Keys API to get the Azure Cosmos DB keys.
            string endpoint = $"https://management.azure.com/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/databaseAccounts/{accountName}/listKeys?api-version=2019-12-12";

            // Add the access token to request headers.
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            // Post to the endpoint to get the keys result.
            var result = await httpClient.PostAsync(endpoint, new StringContent(""));

            // Get the result back as a DatabaseAccountListKeysResult.
            string keysResult = await result.Content.ReadAsStringAsync();

            var keys = JsonConvert.DeserializeObject<DatabaseAccountListKeysResult>(keysResult);

            client = new CosmosClient("https://selfteachdev.documents.azure.com:443/", "S7WxcORobRt8R5wIDDXsjNdnwC8D2LVu55aKzfql3AHsbnmxnhD9Dxgw6ZYguly0dXvAPJ9HlmjbET3ybGwS1Q ==");
            //client = new CosmosClient(cosmosDbEndpoint, keys.primaryMasterKey);

        }

        public CosmosDBService()
        {
        }
    }
}