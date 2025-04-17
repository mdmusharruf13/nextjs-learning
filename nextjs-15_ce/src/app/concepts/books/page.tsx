import Link from "next/link";

export default function BookPage() {
    return (
        <>
            <h1>Popular Books</h1>
            <Link href="/concepts/books/1">Book 1</Link>
            <Link href="/concepts/books/2">Book 2</Link>
            <Link href="/concepts/books/3">Book 3</Link>
        </>
    )
}