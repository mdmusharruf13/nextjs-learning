import connectToDB from "@/database/blogdb";
import Blog from "@/model/blog";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        await connectToDB();
        console.log("connect to db for getting blogs");

        const blogs = await Blog.find({});

        if (blogs) {
            return NextResponse.json({
                success: true,
                message: "fetched successfully",
                data: blogs
            })
        } else {
            return NextResponse.json({
                success: false,
                message: "something went wrong try again later"
            })
        }

    } catch (err) {
        return NextResponse.json({
            success: false,
            message: "something went wrong try again later"
        })
    }
}