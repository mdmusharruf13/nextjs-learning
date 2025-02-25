export default async function ProjectIDPage({ params, searchParams }) {
    let resolvedParams = await params;

    const resolvedSearchParams = await searchParams;
    console.log(resolvedSearchParams);

    return <section>
        <p>the project id is : {resolvedParams.project_id}</p>
    </section>
}