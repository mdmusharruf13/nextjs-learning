"use client";
import { usePathname } from "next/navigation";

export default function NotFound() {

    const pathname = usePathname();
    const productId = pathname.split("/").at(-3);

    return <section>
        <h2>review not found for product id {productId} </h2>
    </section>
}