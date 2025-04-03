export default async function Reviews({params}: {
    params: Promise<{slug: string[]}>
}) {
    const paths = (await params).slug;

    if(paths?.length) {
        return <p>paths is: {paths.join("/")}</p>
    }

    return <section>
        <p>Welcome to Review page</p>
    </section>
}