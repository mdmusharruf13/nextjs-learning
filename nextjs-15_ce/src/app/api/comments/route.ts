import { comments } from "./data";

export async function GET() {
    return Response.json(comments);
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