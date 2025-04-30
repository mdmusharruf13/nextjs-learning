"use client";

import { deleteProduct } from "@/actions/product";
import { startTransition, useOptimistic, useState } from "react";
import { Product } from "./page";
import Link from "next/link";
import Button from "@/components/Button";

export default function Products({ products }: { products: Product[] }) {
  const [localProducts, setLocalProducts] = useState(products);

  const [optimisticProducts, setOptimisticProducts] = useOptimistic(
    localProducts,
    (currentProducts, productId: string) => {
      return currentProducts.filter((product) => product._id !== productId);
    }
  );

  function handleDelete(id: string) {
    startTransition(() => {
      setOptimisticProducts(id);
    });
    deleteProduct(id).then(() => {
      setLocalProducts((prev) => prev.filter((p) => p._id !== id));
    });
  }

  return (
    <section className="flex flex-col gap-3">
      {optimisticProducts?.map((product: any) => (
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
  );
}
