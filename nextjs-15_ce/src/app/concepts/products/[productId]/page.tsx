type productIdParams = {
  params: Promise<{ productId: string }>;
};

export default async function ProductIdPage({ params }: productIdParams) {
  const { productId } = await params;
  return <section>product id: {productId}</section>;
}
