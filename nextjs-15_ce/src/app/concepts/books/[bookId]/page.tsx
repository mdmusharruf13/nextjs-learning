export const dynamicParams = false;

export async function generateStaticParams() {
    return [{bookId: "1"}, {bookId: "2"}, {bookId: "3"}];
}

export default async function Book({params}: {params: Promise<{bookId: string}>}) {

    const bookId = (await params).bookId;

    return (
        <>
            <h1>Book {bookId}</h1>
            <p>current time is {new Date().toLocaleTimeString()}</p>
        </>
    )
}