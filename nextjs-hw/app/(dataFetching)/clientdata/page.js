"use client";

import { useEffect, useState } from 'react';

function ClientData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const result = await response.json();
            setData(result);
        }
        fetchData();
    }, []);
    return (
        <section>
            {data && data.length ?
                <ul>
                    {data.map(item => (
                        <li key={item.id}>{item.title}</li>
                    ))}
                </ul>
                :
                <p>loading...</p>
            }
        </section>
    )
}

export default ClientData