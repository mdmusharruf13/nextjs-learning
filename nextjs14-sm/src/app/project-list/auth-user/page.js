"use client";

import { fetchAuthUser, logoutUser } from "@/actions/auth-user";
import Button from "@/components/Button";
import { useEffect, useState } from "react";

export default function AuthUserPage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            const userInfo = await fetchAuthUser();
            if (userInfo?.success) {
                setUser(userInfo.data);
            }
        }
        fetchUser();
    }, []);

    async function handleLogout() {
        const logout = await logoutUser();
        if (logout?.success) {
            setUser(null);
        }
    }

    return (
        <section className="m-4">
            <h1 className="text-xl font-bold">Auth User Page</h1>
            {user ? <section>
                <p>username:{user?.userName}</p>
                <p>email:{user?.email}</p>
                <Button onClick={handleLogout}>Logout</Button>
            </section>
                : <p>Not loggedIn | please login...</p>}
        </section>
    )
}