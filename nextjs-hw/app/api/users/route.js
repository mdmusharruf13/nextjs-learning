import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ success: "this is success message from server", host: process.env.HOST })
}

export async function POST(req, res) {
    let { name, email, password } = await req.json();
    console.log(name, email, password);
    if (!name || !email || !password) {
        return NextResponse.json(
            { error: "required field not found", ok: false },
            { status: 400 }
        )
    }

    return NextResponse.json(
        { res: 'Credentials verified, user logged In', ok: true },
        { status: 201 }
    );
}