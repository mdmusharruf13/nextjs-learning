import { comments } from "../data";

export async function GET(request: Request, {params}: { params: Promise<{id: string}>}) {
    const id = (await params).id;
    const result = comments.find(comment => comment.id == +id);

    return Response.json(result);
}