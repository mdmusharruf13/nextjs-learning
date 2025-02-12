import Link from "next/link";
import { links } from "./links";

export default function Navbar() {
  return (
    <div>
      <section>Logo</section>
      <section>
        {links.map((link) => (
          <Link href={link.path} key={link.path}>
            {link.title}
          </Link>
        ))}
      </section>
    </div>
  );
}
