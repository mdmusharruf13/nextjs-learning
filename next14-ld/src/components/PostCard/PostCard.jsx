import Image from "next/image";
import styles from "./postCard.module.css";
import Link from "next/link";

export default function PostCard() {
  return (
    <section className={styles.container}>
      <section className={styles.imageContainer}>
        <section className={styles.image}>
          <Image
            src={
              "https://images.unsplash.com/photo-1591779051696-1c3fa1469a79?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="blog-image"
            width={300}
            height={300}
            className={styles.img}
          />
        </section>
        <section className={styles.dateContainer}>
          <span className={styles.date}>Feb 13 2025</span>
        </section>
      </section>
      <section className={styles.infoContainer}>
        <p className={styles.title}>title</p>
        <p className={styles.desc}>Description</p>
        <Link href="/" className={styles.link}>
          Readmore
        </Link>
      </section>
    </section>
  );
}
