import { Metadata } from "next";

type productIdParams = {
  params: Promise<{ productId: string }>;
};

export default async function ProductIdPage({ params }: productIdParams) {
  const { productId } = await params;
  return <section>product id: {productId}</section>;
}


export const generateMetadata = async ({params} : productIdParams):  Promise<Metadata> => {
  const id = (await params).productId;

  return {
    title: `product ${id}`
  }
}