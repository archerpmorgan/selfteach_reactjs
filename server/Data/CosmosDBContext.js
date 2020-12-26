import { CosmosClient } from "@azure/cosmos";
import { config } from "../config.js"


const client = new CosmosClient(config());
const { database } = await client.databases.createIfNotExists({ id: "userdata" });
export const { container } = await database.containers.createIfNotExists({ id: "archer" });
