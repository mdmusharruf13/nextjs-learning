"use client"
import Link from "next/link";
import { useRouter } from "next/navigation"

export const btnStyle = "border-black border rounded-lg bg-black text-white font-semibold px-4 py-1";

export default function Home() {
  const router = useRouter();

  const navigateTo = (page) => {
    router.push(page);
  }

  return (
    <section className="m-2">
      <p>HOME</p>
      <button className={btnStyle} onClick={() => navigateTo('about')}>About us</button>

      <section className="m-4 flex gap-1">
        <Link href={"login"}><button className={btnStyle}>login</button></Link>
        <Link href={"signin"}><button className={btnStyle}>signin</button></Link>
      </section>
    </section>
  )
}
