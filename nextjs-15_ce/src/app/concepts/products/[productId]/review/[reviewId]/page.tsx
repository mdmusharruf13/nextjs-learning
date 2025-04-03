import { notFound } from "next/navigation";

export default async function ReviewIdPage({params}: {
    params: Promise<{ productId: number, reviewId: string }>
}) {
    const {productId, reviewId} = await params;

    if(productId > 100) {
        notFound();
    }

    return (
        <section>
            <p>review {reviewId} for product {productId}</p>
        </section>
    )
}