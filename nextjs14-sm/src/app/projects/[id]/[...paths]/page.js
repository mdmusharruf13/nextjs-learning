"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { use } from "react";

export default function Paths({ params }) {
    const newParam = use(params);
    const pathName = usePathname();
    const searchParams = useSearchParams();
    console.log(searchParams.get("project"));

    return <section>
        <h1>this is final page</h1>
        <p>All paths are : {newParam.paths.toString()}</p>
        <p>current path is : {pathName}</p>
        <p>Project ID using Search Params: {searchParams.get("project")}</p>
        <p>Username using Search Params: {searchParams.get("user")}</p>
    </section>
}