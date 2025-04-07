import { Metadata } from "next";
import { redirect } from "next/navigation";

type productIdParams = {
  params: Promise<{ productId: number }>;
};

export default async function ProductIdPage({ params }: productIdParams) {
  const { productId } = await params;

  if(productId > 100) redirect("/concepts/products");
  
  return <section>product id: {productId}</section>;
}


export const generateMetadata = async ({params} : productIdParams):  Promise<Metadata> => {
  const id = (await params).productId;

  return {
    title: `product ${id}`
  }
}