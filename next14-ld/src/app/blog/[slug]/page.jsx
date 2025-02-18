import { use } from "react";
import styles from "./singlePost.module.css";
import Image from "next/image";

const getData = async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};

export default async function SinglePostPage({ params }) {
  const { slug } = await params;

  const post = await getData(slug);
  console.log(post);
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
            <p className={styles.text}>Musharruf</p>
          </section>
          <section className={styles.info}>
            <p className={styles.subHeading}>Published</p>
            <p className={styles.text}>02 Feb 2024</p>
          </section>
        </section>
        <section className={styles.description}>
          <p>{post.body}</p>
        </section>
      </section>
    </section>
  );
}
