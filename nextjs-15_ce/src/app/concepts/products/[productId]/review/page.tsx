"use client";

import { use } from "react";

export default function ReviewPage({params}: {
    params: Promise<{productId: string}>
}) {

    const {productId} = use(params);
    return (
        <section>
            <h1>this is review page with product id: {productId}</h1>
        </section>
    )
}