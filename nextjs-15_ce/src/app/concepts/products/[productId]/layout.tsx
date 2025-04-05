export default function LayoutPage({children} : {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
            <h2>featured product</h2>
        </>
    )
}