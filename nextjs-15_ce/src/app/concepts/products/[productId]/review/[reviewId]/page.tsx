export default async function ReviewIdPage({params}: {
    params: Promise<{ productId: string, reviewId: string }>
}) {
    const {productId, reviewId} = await params;

    return (
        <section>
            <p>review {reviewId} product {productId}</p>
        </section>
    )
}