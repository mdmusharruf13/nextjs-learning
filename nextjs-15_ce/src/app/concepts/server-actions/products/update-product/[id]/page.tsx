import { getProducts, updateProducts } from "@/actions/product";
import Form from "../../form";
import { Product } from "../../page";

export default async function UpdateProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const products = await getProducts();
  const productList: Product[] = products?.filter(
    (product) => product._id == id
  );

  return <Form action={updateProducts} formData={productList[0]} />;
}
