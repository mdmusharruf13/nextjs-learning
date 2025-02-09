import { redirect } from "next/navigation";
import React from "react";

export default function ID({ params }) {
    const param = React.use(params);

    if (param.id == 4) {
        redirect("/login");
    }

    return <section>
        <p>Id is {param.id}</p>
    </section>
}