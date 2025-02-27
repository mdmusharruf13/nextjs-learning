"use client";

import { use } from "react";
import useSWR from "swr";


const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function fetchSingleUser({ params }) {

    const { swrId } = use(params);
    const { data: user, error, isLoading } = useSWR(`https://dummyjson.com/users/${swrId}`, fetcher);

    if (isLoading) {
        return <h1 className="text-2xl text-center">User data is loading! please wait...</h1>
    }
    if (error) {
        return <h1 className="text-2xl text-center">User does not exist | failed to fetch</h1>
    }
    console.log(user)
    return <section>
        {user && <>
            <p>Name: {user?.firstName} {user?.lastName}</p>
            <p>Age: {user?.age}</p>
            <p>Gender: {user?.gender}</p>
            <img src={user?.image} alt="user-image" /></>}
    </section>
}