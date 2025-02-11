"use client";

import { Indie_Flower } from "next/font/google";
import { useState } from "react";


const indieFlower = Indie_Flower({ subsets: ['latin'], weight: "400" })
export default function Users() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        let response = await fetch("api/users", {
            method: 'POST',
            body: JSON.stringify({ name, email, password })
        });

        response = await response.json();
        setName("");
        setEmail("");
        setPassword("");
        if (response.ok) {
            let value = JSON.stringify(response.res);
            alert(value);
        } else {
            alert("An error occured while creating new user")
        }
    }

    return (
        <section className="m-4 inline-flex flex-col gap-2">
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name"
                className={`${indieFlower.className} border border-black inline px-1`}
            />
            <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`${indieFlower.className} border border-black inline px-1`} />
            <input
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`${indieFlower.className} border border-black inline px-1`} />
            <button onClick={handleSubmit} className="border border-black rounded-md hover:bg-black hover:text-white transition-all duration-200">submit</button>
        </section>
    )
}