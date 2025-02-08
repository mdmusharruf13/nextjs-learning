import Link from "next/link";

export default function NavBar() {
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
