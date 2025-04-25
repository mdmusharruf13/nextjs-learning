import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export async function connectToDB() {
    if(!uri) throw new Error("Please define MONGO_URI");

    const client = new MongoClient(uri);
    await client.connect();
    return client;
}