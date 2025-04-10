import Link from "next/link"
import { data } from "../data"

const getDivStyles = (color: string) => {
    const divStyles = {
        color: `${color}`,
        backgroundColor: 'azure',
        minHeight: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    }
    return divStyles;
}

export default function FeedLayout({
    children,
    modal
} : {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <section>
            <section>{children}</section>
            <section className="grid lg:grid-cols-3 gap-8 md:grid-cols-2 sm:grid-cols-1">
                {data.map((data => (
                    <Link  href={`/concepts/parallel-intercepting/photo/${data.id}`} key={data.color}>
                        <div style={getDivStyles(data.color)}>
                            {data.text}
                        </div>
                    </Link>
                )))}
            </section>
            <section>{modal}</section>
        </section>
    )
}