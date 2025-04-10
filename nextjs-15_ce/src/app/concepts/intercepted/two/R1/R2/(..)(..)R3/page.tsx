import Button from "@/components/Button";
import Link from "next/link";

export default function R3Page() {
    return (
        <section>
            <p>welcome to R3 page - (..)R3 intercepted route</p>
            <Link href={`/concepts/intercepted/two/R1`}><Button>Go to R1</Button></Link>
        </section>
    )
}