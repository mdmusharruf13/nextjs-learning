import { connectToDB } from "@/utils/connectToDb"
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        const db = await connectToDB();
        const collection = db.collection('posts');
        const posts = await collection.find().toArray();
        return NextResponse.json(posts);
    }
    catch (error) {
        throw new Error("failed to fetch posts");
    }
}