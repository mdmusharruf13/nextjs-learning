"use client"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter();

  const navigateTo = (page) => {
    router.push(page);
  }

  return (
    <section className="m-2">
      <p>HOME</p>
      <button className="border-black border rounded-lg bg-black text-white font-semibold px-4 py-1" onClick={() => navigateTo('about')}>About us</button>
    </section>
  )
}
