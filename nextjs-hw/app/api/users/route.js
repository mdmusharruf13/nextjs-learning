import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ success: "this is success message from server", host: process.env.HOST })
}

export async function POST(req, res) {
    let { email, password } = await req.json();
    console.log(email, password);
    if (!email || !password) {
        return NextResponse.json({ error: "required field not found" }, { status: 400 })
    }

    return NextResponse.json({ res: 'Credentials verified, user successfully logged In' });
}