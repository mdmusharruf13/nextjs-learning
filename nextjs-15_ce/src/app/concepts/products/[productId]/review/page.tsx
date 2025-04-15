"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Loading from "../../loading";

export default function ReviewPage({params}: {
    params: Promise<{productId: number}>
}) {

    const [loading, setLoading] = useState(true);
    const {productId} = use(params);
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        
        if(productId > 100) {
            const timer = setTimeout(() => {
                router.push("/concepts/products");
            }, 3000);

            return () => clearTimeout(timer);
        }
    },[productId]);

    if(loading) {
        return <Loading />
    }

    return (
        <section>
            <h1>this is review page with product id: {productId}</h1>
            {productId > 100 ? <p>Product Id should be less than 100. Redirecting to Product page</p>: null}
        </section>
    )
}