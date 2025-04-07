import Link from "next/link"

export default async function ArticlePage({params, searchParams}: {
    params: Promise<{articleId: string}>,
    searchParams: Promise<{lang: "en" | "es" | "fr"}>
}) {

    const {articleId} = await params;
    const {lang = "en"} = await searchParams;
    
    return (
        <section>
            <h1>News article {articleId}</h1>
            <p>Reading in {lang}</p>

            <section className="flex gap-2">
                <Link href={`/concepts/articles/${articleId}?lang=en`}>English</Link>
                <Link href={`/concepts/articles/${articleId}?lang=es`}>Spanish</Link>
                <Link href={`/concepts/articles/${articleId}?lang=fr`}>French</Link>
            </section>
        </section>
    )
}