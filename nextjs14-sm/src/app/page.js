"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  console.log(router);

  return <main>
    <section className="flex min-h-screen flex-col items-center p-24">
      <h1>Welcome to NextJS Class</h1>
      <Link href={"projects"}>Navigate to Projects page</Link>
      <Link href={"/about"}>Navigate to About us page</Link>

      <button className="font-bold mt-23 text-lg" onClick={() => router.push("/projects")}>Alternative way of navigating</button>

      <Button onClick={() => router.push("project-list/blog/blog-home")}>Go to Blog Project</Button>
    </section>
  </main>
}
