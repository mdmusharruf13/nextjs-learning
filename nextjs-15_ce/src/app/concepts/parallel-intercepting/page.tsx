"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ParalledInterceptingPage() {
    const pathname = usePathname();
    return (
        <section>
            <p>this is paralled intercepting route page</p>
            <Link href={`${pathname}/feed`}><Button>Go to Feed</Button></Link>
        </section>
    )
}