"use client";

import { useState } from 'react';

export default function ClientPage() {
    const [input, setInput] = useState("");

    return (
        <section>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <p>Input is : {input}</p>
        </section>
    )
}