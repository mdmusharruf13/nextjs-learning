import Link from "next/link";

export default function NotificationsPage() {
    return (
        <section>
            <h1>List of notifications</h1>
            <Link href={"/concepts/dashboard/archived"} className="cursor-pointer p-1 bg-gray-300 rounded-md">archive notification</Link>
        </section>
    )
}