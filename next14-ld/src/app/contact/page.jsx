import Image from "next/image";
import styles from "./contact.module.css";

export default function contact() {
  return (
    <>
      <section className={styles.container}>
        <section className={styles.imgContainer}>
          <Image
            src={"/contactme.png"}
            alt="contact me"
            width={500}
            height={500}
          />
        </section>
        <section className={styles.formContainer}>
          <form className={styles.form}>
            <input type="text" placeholder="Enter Your Name" />
            <input type="text" placeholder="Email Address" />
            <input type="text" placeholder="Phone Number (Optional)" />
            <textarea cols={30} rows={10} placeholder="Message"></textarea>
            <button className={styles.btn}>Submit</button>
          </form>
        </section>
      </section>
    </>
  );
}
