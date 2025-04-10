import Button from "@/components/Button";
import Link from "next/link";

export default function R1Page() {
    return (
        <section>
            <p>welcome to R1 page</p>
            <Link href={"/concepts/intercepted/two/R1/R2"}><Button>Go to R2</Button></Link>
        </section>
    )
}