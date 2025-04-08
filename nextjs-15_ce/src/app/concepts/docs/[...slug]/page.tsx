export default async function Docs({params}: {
    params: Promise<{slug: string[]}>
}) {
    const {slug} = await params;

    throw new Error("Runtime render error");

    return <section>
        <p>path is: {slug.join("/")}</p>
    </section>
}