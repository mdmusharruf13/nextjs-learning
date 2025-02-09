"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <nav className="flex justify-around">
      <section>
        <Link href={"/"}>Logo</Link>
      </section>
      <section>
        <ul>
          <li>
            <Link className="link" href={"/"}>
              Home
            </Link>
            <Link className="link" href={"/about"}>
              About
            </Link>
            <Link className="link" href={"/contact"}>
              Contact
            </Link>
          </li>
        </ul>
      </section>
    </nav>
  );
}
