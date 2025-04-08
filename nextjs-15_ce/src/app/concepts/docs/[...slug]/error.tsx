"use client";

import { useRouter } from "next/navigation";

export default function Error({error, reset}: {
    error: Error,
    reset: () => void
}) {
    const router = useRouter();
    return (
        <section>
            <h1>Something went wrong</h1>
            <p>{error.message}.</p>

            <section className="flex gap-2">
            <button onClick={() => router.back() } className="bg-gray-300 p-1 cursor-pointer rounded-md">Go Back</button>
            <button onClick={() => reset() } className="bg-gray-300 p-1 cursor-pointer rounded-md">Try again</button>
            </section>
        </section>
    )
}