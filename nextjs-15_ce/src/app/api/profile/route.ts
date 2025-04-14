import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    console.log(requestHeaders.get("Authorization"));

    return new Response("<h1>Profile API data.</h1>", {
        headers: {
            "Content-Type": "text/html"
        }
    });
}