import connectToDB from "@/database/blogdb";
import Blog from "@/model/blog";
import { NextResponse } from "next/server";

function validate(title, description) {
    let error = false;
    if (title.length == 0 || description.length == 0) {
        error = true;
    }
    return { error };
}

export async function POST(req) {
    try {
        await connectToDB();
        console.log("connected to Database!!");

        const blogData = await req.json();
        const { title, description } = blogData;

        const { error } = validate(title, description);
        if (error) {
            return NextResponse.json({
                success: false,
                message: "one field is missing"
            });
        }

        console.log("first", blogData);

        const blogInserted = await Blog.create(blogData);
        if (blogInserted) {
            return NextResponse.json({
                success: true,
                message: "Blog added successfully!!"
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "something went wrong ! Please try again"
            })
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: "something went wrong ! Please try again"
        })
    }
}