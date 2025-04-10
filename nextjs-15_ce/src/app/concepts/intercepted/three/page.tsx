import Button from "@/components/Button";
import Link from "next/link";

export default function ThreePage() {
    return (
        <section>
            <p>testing of (...) root intercepting</p>
            <Link href={`/contact`}><Button>Go to Contact</Button></Link>
        </section>
    )
}