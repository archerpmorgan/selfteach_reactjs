import { CosmosClient } from "@azure/cosmos";
import { cosmosConfig } from "../config.js"

console.log(cosmosConfig())
const client = new CosmosClient(cosmosConfig());
export const { database } = await client.databases.createIfNotExists({ id: "userdata" });
