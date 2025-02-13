import PostCard from "@/components/PostCard/PostCard";
import styles from "./blog.module.css";

export default function BlogPage() {
  return (
    <section className={styles.container}>
      <article className={styles.post}>
        <PostCard />
      </article>
      <article className={styles.post}>
        <PostCard />
      </article>
      <article className={styles.post}>
        <PostCard />
      </article>
      <article className={styles.post}>
        <PostCard />
      </article>
    </section>
  );
}
