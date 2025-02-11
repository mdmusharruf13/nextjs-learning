import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ success: "this is success message from server" })
}