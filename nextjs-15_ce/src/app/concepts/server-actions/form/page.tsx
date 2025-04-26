import { connectToDB } from "@/utils/mongodb";
import Submit from "@/components/Submit";

export default function AddProduct() {
  const styles = {
    input: {
      border: "1px solid black",
    },
  };

  async function submitForm(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const password = formData.get("pswd");

    const client = await connectToDB();
    const db = client.db("practice");
    const forms = db.collection("forms");
    const result = await forms.insertOne({ name, password });

    console.log(result);
  }

  return (
    <form action={submitForm}>
      <section>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" id="name" style={styles.input} />
      </section>

      <section>
        <label htmlFor="pswd">Password: </label>
        <input type="password" name="pswd" id="pswd" style={styles.input} />
      </section>

      <Submit />
    </form>
  );
}
