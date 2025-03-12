"use client";

import Button from "@/components/Button";
import { usePathname, useRouter } from "next/navigation";

export default function AuthUserPage() {
    const router = useRouter();
    const pathName = usePathname();

    return (
        <section className="m-4">
            <h1 className="text-xl font-bold">Auth User Page</h1>
            <section className="flex gap-4 mt-4">
                <Button onClick={() => router.push(`${pathName}/sign-up`)}>Go to SignUp Page</Button>
                <Button onClick={() => router.push(`${pathName}/sign-in`)}>Go to Login Page</Button>
            </section>
        </section>
    )
}