"use client";

export default function clientOne() {
    console.log("client component");
    return (
        <section>
            <p>Client component</p>
            <button onClick={() => alert("it is client component")}>click me</button>

        </section>
    )
}