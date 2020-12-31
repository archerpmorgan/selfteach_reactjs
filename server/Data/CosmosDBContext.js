import { CosmosClient } from "@azure/cosmos";
import { config } from "../config.js"


const client = new CosmosClient(config());
export const { database } = await client.databases.createIfNotExists({ id: "userdata" });
