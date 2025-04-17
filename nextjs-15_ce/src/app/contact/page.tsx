import { cookies } from "next/headers";

export default async function ContactPage() {

  const cookieStore = cookies();
  const theme = (await cookieStore).get("theme");

  return (
    <section>
      <p>this is contact page</p>
      <p>theme is: {theme?.value ?? "white"}</p>
    </section>
  );
}
