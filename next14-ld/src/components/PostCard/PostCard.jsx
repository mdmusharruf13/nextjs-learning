import Image from "next/image";
import styles from "./postCard.module.css";
import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <section className={styles.container}>
      {post.img && (
        <section className={styles.imageContainer}>
          <section className={styles.image}>
            <Image
              src={post.img}
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
      )}
      <section className={styles.infoContainer}>
        <p className={styles.title}>{post.title}</p>
        <p className={styles.desc}>{post.description}</p>
        <Link href={`/blog/${post.slug}`} className={styles.link}>
          Readmore
        </Link>
      </section>
    </section>
  );
}
