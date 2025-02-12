"use client";

import Link from "next/link";
import { links } from "./links";
import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [show, setShow] = useState(false);
  const pathName = usePathname();
  let isAdmin = true;
  let isLoggedIn = true;
  const showHamburger = () => {
    setShow(!show);
  };

  return (
    <div className={styles.container}>
      <section className={styles.logo}>Logo</section>
      <section className={`${styles.links} ${show ? styles.show : ""}`}>
        {links.map((link) => (
          <Link
            href={link.path}
            key={link.path}
            className={`${styles.link} ${
              pathName === link.path && styles.active
            } `}
          >
            {link.title}
          </Link>
        ))}
        {isLoggedIn ? (
          <>
            {isAdmin && (
              <Link
                href={"/admin"}
                className={`${styles.link} ${
                  pathName === "/admin" && styles.active
                }`}
              >
                Admin
              </Link>
            )}
            <Link href={"/logout"} className={styles.logout}>
              Logout
            </Link>
          </>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </section>
      <section
        className={`${styles.hamburger} ${show ? styles.hamburgerShow : ""}`}
        onClick={showHamburger}
      >
        {show ? "X" : "☰"}
      </section>
    </div>
  );
}
