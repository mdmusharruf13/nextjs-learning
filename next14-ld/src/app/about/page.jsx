import Image from "next/image";
import styles from "./about.module.css";

export default function about() {
  return (
    <section className={styles.container}>
      <section className={styles.textContainer}>
        <p className={styles.title}>About Agency</p>
        <p className={styles.heading}>
          We create digital ideas that are bigger, bolder braver and better.
        </p>
        <p>
          We create digital ideas that are bigger, bolder, braver and better. We
          believe in good ideas flexibility and precision. We're world's Our
          Special Team best consulting solution provider. Wide range of web and
          software development services.
        </p>
        <section className={styles.infoContainer}>
          <section className={styles.info}>
            <p className={styles.number}>10 K+</p>
            <p>Years of experience</p>
          </section>
          <section className={styles.info}>
            <p className={styles.number}>234 K+</p>
            <p>People reached</p>
          </section>
          <section className={styles.info}>
            <p className={styles.number}>10 K+</p>
            <p>Years of experience</p>
          </section>
        </section>
      </section>
      <section>
        <Image
          src={"/introImage.png"}
          alt="about image"
          width={500}
          height={500}
        />
      </section>
    </section>
  );
}
