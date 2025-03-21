import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request) {
    const path = request.nextUrl.pathname;
    const checkPublicPath = path === '/project-list/auth-user/sign-in' || path === '/project-list/auth-user/sign-up';

    // const cookieStore = await cookies();
    // const token = cookieStore.get("token")?.value || "";

    const token = request.cookies.get('token')?.value || '';
    console.log("middleware token: ", token);


    if (checkPublicPath && token !== '') {
        return NextResponse.redirect(new URL("/project-list/auth-user", request.nextUrl));
    }

    if (!checkPublicPath && token === '') {
        return NextResponse.redirect(new URL("/project-list/auth-user/sign-up", request.nextUrl));
    }
}

export const config = {
    matcher: [
        "/project-list/auth-user/sign-in",
        "/project-list/auth-user/sign-up"
    ]
};