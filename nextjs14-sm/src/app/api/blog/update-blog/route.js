import connectToDB from "@/database/blogdb";
import Blog from "@/model/blog";
import { NextResponse } from "next/server";

export async function PUT(request) {
    try {
        await connectToDB();
        console.log("connected to DB for blog update");

        const { id, title, description } = await request.json();

        const blog = await Blog.findByIdAndUpdate({ _id: id }, { title, description }, { new: true });

        if (blog) {
            return NextResponse.json({
                success: true,
                message: "updated successfully"
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "something went wrong | please try again later."
            })
        }

    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: "something went wrong | please try again later."
        })
    }

}