import Link from "next/link";

export default function Home() {
  return <div>
    <section>
    This is home page
    </section>
    <section className="flex flex-col">
      <Link href={"/contact"}>Go to Contact page</Link>
      <Link href={"/concepts/products"}>Go to Products page</Link>
    </section>
  </div>;
}
