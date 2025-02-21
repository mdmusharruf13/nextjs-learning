import { connectToDB } from "@/utils/connectToDb"
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    const { slug } = params
    try {
        const db = await connectToDB();
        const collection = db.collection('posts');
        const post = await collection.find(slug).toArray();
        return NextResponse.json(post);
    } catch (error) {
        console.log(error);
        throw new Error("failed to fetch data");
    }
}