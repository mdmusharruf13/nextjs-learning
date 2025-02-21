import PostCard from "@/components/PostCard/PostCard";
import styles from "./blog.module.css";
import { getPosts } from "@/utils/data";

const getData = async () => {
  const response = await fetch("http://localhost:3000/api/blog", {
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

  // Fetch data with an API
  const posts = await getData();

  // Fetch data with an API
  // const posts = await getPosts();

  console.log("posts", posts);

  return (
    <section className={styles.container}>
      {posts.map((post) => {
        return (
          <article className={styles.post} key={post._id}>
            <PostCard post={post} />
          </article>
        );
      })}
    </section>
  );
}
