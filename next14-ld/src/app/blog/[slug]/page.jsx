import styles from "./singlePost.module.css";
import Image from "next/image";

export default function SinglePostPage() {
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
        <p className={styles.title}>Title</p>
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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            at doloremque quisquam perferendis possimus repudiandae illum, eius,
            laboriosam dicta, et ea fuga debitis in totam aspernatur. Adipisci
            esse architecto officiis quasi perspiciatis, dolor eligendi
            cupiditate, quo aperiam, reiciendis veritatis minima impedit ipsa
            quod nulla accusamus similique aliquid consequatur sunt magni.
          </p>
        </section>
      </section>
    </section>
  );
}
