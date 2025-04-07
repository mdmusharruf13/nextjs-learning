export default function TemplatePage({ children } : {
    children: React.ReactNode
}) {
    return (
        <>
            <section>
                <h1>Auth page</h1>
                {children}
            </section>
        </>
    )
}