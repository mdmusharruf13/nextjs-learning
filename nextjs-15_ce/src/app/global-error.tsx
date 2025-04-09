"use client";

export default function GlobalError() {
    return (
        <section className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <button
                onClick={() => window.location.reload()}
                className="bg-gray-300 rounded-md p-1 cursor-pointer"
            >Refresh</button>
        </section>
    )
}