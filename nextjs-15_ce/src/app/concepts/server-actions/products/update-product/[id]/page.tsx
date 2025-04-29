import { getProducts, updateProducts } from "@/actions/product";
import Form from "../../form";

export default async function UpdateProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const products = await getProducts();
  const productList: any = products?.filter((product) => product._id == id);

  return <Form action={updateProducts} formData={productList[0]} />;
}
