"use client";

import { useTheme } from '@/context/ThemeProvider';
import { useState } from 'react';

export default function ClientPage() {
    const [input, setInput] = useState("");
    const theme = useTheme();

    return (
        <section>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <p style={{ color: theme.colors.primary}}>Input is : {input}</p>
        </section>
    )
}