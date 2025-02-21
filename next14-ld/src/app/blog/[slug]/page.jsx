import styles from "./singlePost.module.css";
import Image from "next/image";
import { getPost, getUser } from "@/utils/data";

const getData = async (id) => {
  const response = await fetch(`http://localhost:3000/api/blog/${id}`);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};

export default async function SinglePostPage({ params }) {
  const { slug } = await params;

  const post = await getData(slug);
  // const [post] = await getPost({ slug: slug });

  const [user] = await getUser(post.userId);

  return (
    <section className={styles.container}>
      <section className={styles.imgContainer}>
        <Image
          src={"/introImage.png"}
          alt="post image"
          width={500}
          height={500}
          className={styles.img}
        />
      </section>
      <section className={styles.infoContainer}>
        <p className={styles.title}>{post.title}</p>
        <section className={styles.postData}>
          <section className={styles.avatarContainer}>
            <Image
              src={"/contactme.png"}
              alt="avatar"
              className={styles.avatar}
              width={50}
              height={50}
            />
          </section>
          <section className={styles.info}>
            <p className={styles.subHeading}>Author</p>
            <p className={styles.text}>{user.username}</p>
          </section>
          <section className={styles.info}>
            <p className={styles.subHeading}>Published</p>
            <p className={styles.text}>02 Feb 2024</p>
          </section>
        </section>
        <section className={styles.description}>
          <p>{post.description}</p>
        </section>
      </section>
    </section>
  );
}
