"use client";

import { useEffect, useState } from "react";


type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}


export default function UserClient() {
    const [users, setUsers] = useState<User []>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchUsers() {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
                if(!response.ok) throw new Error(`Failed to fetch users`);
                const data = await response.json();
                setUsers(data);
            } catch(err) {
                if(err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(`An unknown error occurred`);
                }
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);

    if(loading) return <section>Loading please wait...</section>

    if(error) return <section>{error}</section>

    return (
        <>
            <ul>
                {users.map(user => (
                    <li 
                        key={user.id}
                        className="p-4 bg-white shadow-md rounded-lg text-gray-700"
                    >
                        <p className="font-bold">{user.name}</p>
                        <section>
                            <p>Username: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                        </section>
                    </li>
                ))}
            </ul>
        </>
    )

}



