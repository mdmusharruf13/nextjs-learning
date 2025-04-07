"use client";

import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function ReviewPage({params}: {
    params: Promise<{productId: number}>
}) {

    const {productId} = use(params);
    const router = useRouter();

    useEffect(() => {
        if(productId > 100) {
            const timer = setTimeout(() => {
                router.push("/concepts/products");
            }, 3000);

            return () => clearTimeout(timer);
        }
    },[]);

    return (
        <section>
            <h1>this is review page with product id: {productId}</h1>
            {productId > 100 ? <p>Product Id should be less than 100. Redirecting to Product page</p>: null}
        </section>
    )
}