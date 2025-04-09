import Link from "next/link";

export default function ArchivedNotification() {
    return (
        <section>
            <p>Archived Notification</p>
            <Link href={"/concepts/dashboard"} className="cursor-pointer p-1 bg-gray-300 rounded-md">Go to Default Notification</Link>
        </section>
    )
}