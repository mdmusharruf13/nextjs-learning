"use client";
import { use } from "react";

export default function Paths({ params }) {
    const newParam = use(params);
    return <section>
        <h1>this is final page</h1>
        <p>All paths are : {newParam.paths.toString()}</p>
    </section>
}