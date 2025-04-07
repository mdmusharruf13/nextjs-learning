"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/"
  },
  {
    name: "About",
    href: "/about"
  },
  {
    name: "contact",
    href: "/contact"
  },
];

export default function NavBar() {

    const pathname = usePathname();

    return (
        <section className="flex gap-2">
        {navLinks.map((link) => {
            const isActive = pathname == link.href || (pathname.startsWith(link.href + "/") && link.href);

            return (
                <Link 
                    href={link.href} 
                    key={link.name} 
                    className={isActive ? "font-bold" : "text-blue-500"}
                >
                    {link.name}
                </Link>
            )
        })}
        </section>
);
}