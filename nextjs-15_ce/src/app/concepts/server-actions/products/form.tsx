"use client";

import Submit from "@/components/Submit";

const styles = {
  input: {
    border: "1px solid black",
    padding: "1px 2px",
    borderRadius: "3px",
  },
};

export default function Form({
  action,
  formData,
}: {
  action: any;
  formData?: any;
}) {
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formObj = new FormData(event.currentTarget);
    console.log(event.currentTarget);

    if (formData) {
      formObj.append("_id", formData._id);
    }

    await action(formObj);
  };
  return (
    <form onSubmit={handleSubmitForm} className="flex flex-col gap-2 ">
      <section className="flex gap-2">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          style={styles.input}
          defaultValue={formData?.title}
        />
      </section>
      <section className="flex gap-2">
        <label htmlFor="details">Details</label>
        <input
          type="text"
          name="details"
          id="details"
          style={styles.input}
          defaultValue={formData?.details}
        />
      </section>
      <section>
        <Submit />
      </section>
    </form>
  );
}
