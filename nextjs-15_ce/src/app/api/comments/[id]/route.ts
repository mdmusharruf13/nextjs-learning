import { comments } from "../data";

export async function GET(request: Request, {params}: { params: Promise<{id: string}>}) {
    const id = (await params).id;
    const result = comments.find(comment => comment.id == +id);

    return Response.json(result);
}


export async function PATCH(request: Request, {params}: {params: Promise<{id: string}>}) {

    const { id } = await params;
    const body = await request.json();
    const { comment } = body; 

    const index = comments.findIndex(comment => comment.id == +id);
    comments[index].comment = comment;

    return Response.json(comments[index]);
}


export async function DELETE(request: Request, {params} : {
    params: Promise<{id: string}>
}) {

    const { id } = await params;
    const index = comments.findIndex(comment => comment.id == +id);
    const deletedComment = comments[index];
    comments.splice(index, 1);

    return Response.json(deletedComment);
}