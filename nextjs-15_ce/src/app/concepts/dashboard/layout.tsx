export default function DashboardLayout({
    children, user, revenue, notifications
}: {
    children: React.ReactNode,
    user: React.ReactNode,
    revenue: React.ReactNode,
    notifications: React.ReactNode,
}) {
    return (
        <section className="flex gap-2">
            <section className="flex flex-col gap-1">
                <article className="min-w-[200px] min-h-[200px] border border-gray-400 rounded-md">{user}</article>
                <article className="min-w-[200px] min-h-[200px] border border-gray-400 rounded-md">{revenue}</article>
            </section>
            <section>
                <article className="min-w-[200px] min-h-[400px] border border-gray-400 rounded-md">{notifications}</article>
            </section>
        </section>
    )
}