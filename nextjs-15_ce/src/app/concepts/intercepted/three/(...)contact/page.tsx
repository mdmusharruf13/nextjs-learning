import Button from "@/components/Button";
import Link from "next/link";

export default function M1Page() {
    return (
        <section>
            <p>(...) root intercepting - contact page</p>
            <Link href={`/concepts/intercepted/three`}><Button>Go to three</Button></Link>
        </section>
    )
}