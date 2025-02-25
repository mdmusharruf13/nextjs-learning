"use client";

import { redirect } from "next/navigation";

export default function ProjectsPage() {
    return (
        <section>
            <p>this is project page</p>
            <button onClick={() => redirect("projects/321/598?project=598&user=musharruf")}>Go to first Project</button>
        </section>
    )
}