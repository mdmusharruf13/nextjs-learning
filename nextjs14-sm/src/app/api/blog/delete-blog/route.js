import Blog from "@/model/blog";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    try {
        const { id } = await request.json();

        if (id) {
            const blog = await Blog.findByIdAndDelete(id);
            console.log("blog", blog);
            return NextResponse.json({
                sucess: true,
                message: "Deleted successfully"
            });
        } else {
            return NextResponse.json({
                sucess: false,
                message: "something went wrong | failed to delete"
            });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            sucess: false,
            message: "something went wrong | failed to delete"
        });
    }
}