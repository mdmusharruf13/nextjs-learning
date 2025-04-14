import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    console.log(requestHeaders.get("Authorization"));

    // first approach
    const theme = request.cookies.get("theme");
    console.log(theme);
    
    // second approach
    const cookieStore = await cookies();
    cookieStore.set("resultPercentage", "70");
    console.log(cookieStore.get("resultPercentage"));

    return new Response("<h1>Profile API data.</h1>", {
        headers: {
            "Content-Type": "text/html",
            "Set-Cookie": "theme=dark",
        }
    });
}