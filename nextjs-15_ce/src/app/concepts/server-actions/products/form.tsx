"use client";

import Submit from "@/components/Submit";

const styles = {
  input: {
    border: "1px solid black",
    padding: "1px 2px",
    borderRadius: "3px",
  },
};

export default function Form({ action }: { action: any }) {
  return (
    <form action={action} className="flex flex-col gap-2 ">
      <section className="flex gap-2">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" style={styles.input} />
      </section>
      <section className="flex gap-2">
        <label htmlFor="details">Details</label>
        <input type="text" name="details" id="details" style={styles.input} />
      </section>
      <section>
        <Submit />
      </section>
    </form>
  );
}
