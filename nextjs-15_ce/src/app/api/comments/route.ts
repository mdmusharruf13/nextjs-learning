import { NextRequest } from "next/server";
import { comments } from "./data";

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const filteredComments = query ? comments.filter(obj => obj.comment.includes(query)) : comments;

    return Response.json(filteredComments);
}

export async function POST(response: Response) {
    const res = await response.json();

    const newComments = {
        id: comments.length+1,
        comment: res.comment
    }
    comments.push(newComments);

    return Response.json(comments);
}