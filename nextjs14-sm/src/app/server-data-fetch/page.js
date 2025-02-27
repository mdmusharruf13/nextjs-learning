import Link from "next/link";
import { redirect } from "next/navigation";

async function getUsersList() {
    try {
        const response = await fetch("https://dummyjson.com/users");
        const result = await response.json();

        return result.users;
    } catch (error) {
        throw new Error(error);
    }
}

export default async function ServerDataFetch() {
    const fetchedData = await getUsersList();
    console.log(fetchedData);

    return <section className="m-2">
        <p className="text-2xl">this is server component</p>
        <ul>
            {fetchedData.map(user => (
                <li key={user.id} className="cursor-pointer hover:text-gray-600 ">
                    <Link href={`server-data-fetch/${user.id}`}>{user.firstName} {user.lastName}</Link>
                </li>
            ))}
        </ul>
    </section>
}