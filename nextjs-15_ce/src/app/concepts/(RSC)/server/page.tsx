export default function ServerPage() {
    console.log("this is server component");

    return (
        <section>
            <p>Date: {new Date().toLocaleDateString()}</p>
        </section>
    )
}