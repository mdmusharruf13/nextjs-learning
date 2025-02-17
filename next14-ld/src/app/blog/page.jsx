import PostCard from "@/components/PostCard/PostCard";
import styles from "./blog.module.css";

export default function BlogPage({ params, searchParams }) {
  params.then((result) => console.log(result));
  searchParams.then((result) => console.log(result));
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
