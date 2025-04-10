"use client";

import { useContext } from "react";
import { AuthContext } from "../layout";

export default function LoginPage() {

    const auth = useContext(AuthContext);

    if(!auth) return <p>Auth context not found</p>;

    const {setIsLoggedIn} = auth;

    return (
        <section className="w-full h-60 flex flex-col gap-2 justify-center items-center">
            <p>Please login</p>
            <button className="bg-gray-300 rounded-md p-2 cursor-pointer" onClick={() => setIsLoggedIn(true)}>login</button>
        </section>
    )
}