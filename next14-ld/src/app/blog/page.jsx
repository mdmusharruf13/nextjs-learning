import PostCard from "@/components/PostCard/PostCard";
import styles from "./blog.module.css";

const getData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};

export default async function BlogPage({ params, searchParams }) {
  params.then((result) => console.log(result));
  searchParams.then((result) => console.log(result));

  const posts = await getData();
  return (
    <section className={styles.container}>
      {posts &&
        posts.map((post) => {
          return (
            <article className={styles.post} key={post.id}>
              <PostCard post={post} />
            </article>
          );
        })}
    </section>
  );
}
