import { Suspense } from "react";
import Product from "./Product";
import Reviews from "./Reviews";

export default function StreamingPage() {
    return (
        <section>
            <h1>Streaming page</h1>
            <Suspense fallback={<p>Please wait product is loading...</p>}>
                <Product />
            </Suspense>
            <Suspense fallback={<p>reviews are loading...</p>}>
                <Reviews />
            </Suspense>
        </section>
    )
}