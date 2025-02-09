"use client";

import React from "react";

export default function Project({ params }) {
    const param = React.use(params);
    return <section>
        <p> params: {param.all}</p>
        <p>All Routes:</p>
        <ul>
            {param.all.map(p => <li key={p}>{p}</li>)}
        </ul>
    </section>
}