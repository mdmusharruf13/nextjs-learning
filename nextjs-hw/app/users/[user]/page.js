"use client";

import React from "react";

export default function User({ params }) {
    const { user } = React.use(params);
    return (
        <section>
            <h2>Info about {user}</h2>
            <p>Hello i'm {user}</p>
        </section>
    )
}