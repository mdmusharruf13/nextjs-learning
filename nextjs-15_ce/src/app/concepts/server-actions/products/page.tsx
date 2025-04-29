import { getProducts } from "@/actions/product";
import Button from "@/components/Button";
import Link from "next/link";

export const fetchCache = "force-no-store";

export default async function Products() {
  const products = await getProducts();

  return (
    <section className="mt-4 flex flex-col gap-4">
      <section>
        <h1 className="text-2xl font-bold">products</h1>
        <Link href={"/concepts/server-actions/products/add-product"}>
          <Button>Add Products</Button>
        </Link>
      </section>
      <section>
        {products?.map((product: any) => (
          <section key={product._id}>
            <Link
              href={`/concepts/server-actions/products/update-product/${product._id}`}
            >
              <h2>
                <b>{product.title}</b>
              </h2>
            </Link>
            <p>{product.details}</p>
          </section>
        ))}
      </section>
    </section>
  );
}
