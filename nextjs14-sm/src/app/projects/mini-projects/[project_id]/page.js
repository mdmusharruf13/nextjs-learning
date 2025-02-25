export default async function ProjectIDPage({ params }) {
    let resolvedParams = await params;

    return <section>
        <p>the project id is : {resolvedParams.project_id}</p>
    </section>
}