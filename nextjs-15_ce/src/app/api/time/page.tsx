export const dynamic = "force-static";
export const revalidate = 10;

export async function TimePage() {
    return Response.json({ time: new Date().toLocaleTimeString() }); 
}