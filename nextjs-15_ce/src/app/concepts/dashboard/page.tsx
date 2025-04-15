"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext"; 

export default function DashboardPage() {

    const auth = useContext(AuthContext);

    if(!auth) return <p>Auth context not found</p>;

    const {setIsLoggedIn} = auth;

    return (
        <section className="flex gap-4 items-center my-2">
            <p>this is dashboard page</p>
            <button className="bg-gray-300 cursor-pointer p-2 rounded-md" onClick={() => setIsLoggedIn(false)}>logout</button>
        </section>
    )
}