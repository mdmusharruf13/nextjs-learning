import { getProducts } from "@/actions/product";
import Products from "./Products";
import Link from "next/link";
import Button from "@/components/Button";

export const fetchCache = "force-no-store";

export type Product = {
  _id: string;
  title: string;
  details: string;
};

export default async function ProductsList() {
  const products: Product[] = await getProducts();

  return (
    <section className="mt-4 flex flex-col gap-4">
      <section>
        <h1 className="text-2xl font-bold">products</h1>
        <Link href={"/concepts/server-actions/products/add-product"}>
          <Button>Add Products</Button>
        </Link>
      </section>
      <Products products={products} />
    </section>
  );
}
