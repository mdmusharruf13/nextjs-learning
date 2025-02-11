import { NextResponse } from "next/server";

const data = [
    {
        id: 1,
        name: "mush",
        email: "mush@gmail.com",
        password: "mush123"
    },
    {
        id: 2,
        name: "nawaz",
        email: "nawaz@gmail.com",
        password: "nz123"
    },
]

export function GET() {
    return NextResponse.json({ data });
}