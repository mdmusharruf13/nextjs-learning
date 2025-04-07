import Link from "next/link"

export default function ProductsPage() {
  return (
    <section>
      <ul>
        <li><Link href={"/concepts/products/1"}>product 1</Link></li>
        <li><Link href={"/concepts/products/2"}>product 2</Link></li>
        <li><Link href={"/concepts/products/3"}>product 3</Link></li>
      </ul>
    </section>
  );
}
