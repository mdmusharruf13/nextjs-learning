import Button from "@/components/Button";
import Link from "next/link";

export default function R2Page() {
    return (
        <section>
            <p>welcome to R2 page</p>
            <Link href={`/concepts/intercepted/two/R3`}><Button>Go to R3</Button></Link>
        </section>
    )
}