"use client";

import { deleteProduct, getProducts } from "@/actions/product";
import Button from "@/components/Button";
import Link from "next/link";
import { useEffect, useState } from "react";

export const fetchCache = "force-no-store";

type Product = {
  _id: string;
  title: string;
  details: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productLength, setProductLength] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
      setProductLength(productList.length);
    };
    fetchProducts();
  }, [productLength]);

  function handleDelete(id: string) {
    deleteProduct(id);
    setProductLength((prev) => prev - 1);
  }

  if (products.length == 0) {
    return <section>Loading Products please wait...</section>;
  }

  return (
    <section className="mt-4 flex flex-col gap-4">
      <section>
        <h1 className="text-2xl font-bold">products</h1>
        <Link href={"/concepts/server-actions/products/add-product"}>
          <Button>Add Products</Button>
        </Link>
      </section>
      <section className="flex flex-col gap-3">
        {products?.map((product: any) => (
          <section key={product._id} className="flex flex-col gap-2">
            <Link
              href={`/concepts/server-actions/products/update-product/${product._id}`}
            >
              <h2>
                <b>{product.title}</b>
              </h2>
            </Link>
            <p>{product.details}</p>
            <section>
              <Button onClick={() => handleDelete(product._id)}>Delete</Button>
            </section>
          </section>
        ))}
      </section>
    </section>
  );
}
