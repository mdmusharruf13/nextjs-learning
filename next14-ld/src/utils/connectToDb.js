// const mongoose = require('mongoose');

// export const connection = {};

// export const connectToDb = async () => {
//     try {
//         if (connection.isConnected) {
//             console.log("using existing connection");
//             return;
//         }
//         const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_DB);
//         connection.isConnected = db.connections[0].readyState;
//     } catch (error) {
//         console.log(error);
//         throw new Error(error);
//     }
// }

import { MongoClient } from "mongodb";

const URI = process.env.NEXT_PUBLIC_MONGO_DB;

const client = new MongoClient(URI);

export async function connectToDB() {
    try {
        await client.connect();
        const db = await client.db("mushdb");
        console.log("Successfully connected DB");
        return db;
    }
    catch (error) {
        console.log(error);
    }
}