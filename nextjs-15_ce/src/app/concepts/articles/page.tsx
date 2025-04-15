import { redirect } from "next/navigation"

export default function ArticlePage() {

    redirect("/concepts/articles/breaking-news-598?lang=en");

    return (
        <div>welcome to Article page</div>
    )
}