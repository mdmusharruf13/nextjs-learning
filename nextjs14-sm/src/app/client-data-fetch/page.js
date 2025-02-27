"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClientDataFetch() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function fetchListOfUsers() {
        try {
            setLoading(true);
            const apiResponse = await fetch("https://dummyjson.com/users");
            const result = await apiResponse.json();
            console.log(result);

            if (result?.users) {
                setUsers(result.users);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            throw new Error(error);
        }
    }

    useEffect(() => {
        fetchListOfUsers();
    }, []);

    if (loading) {
        return <h1 className="text-2xl text-center">Loading users ! please wait...</h1>
    }

    const navigate = (userId) => {
        router.push(`client-data-fetch/${userId}`);
    }

    return <section>
        <h1>User List</h1>
        <ul>
            {users && users.length && users.map(user => (
                <li
                    key={user.id}
                    onClick={() => navigate(user.id)}
                    className="cursor-pointer hover:text-gray-600"
                >
                    {user.firstName} {user.lastName}
                </li>
            ))}
        </ul>
    </section>
}