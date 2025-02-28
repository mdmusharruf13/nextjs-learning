"use client";

import Button from "@/components/Button";
import Model from "@/components/Model";
import { useState } from "react";

const initialBlogData = {
    title: "",
    description: ""
};

export default function BlogHomePage() {
    const [isActive, setIsActive] = useState(false);
    const [blogData, setBlogData] = useState(initialBlogData);
    const [btnLabel, setBtnLabel] = useState("Add Blog");

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("/api/blog/add-blog", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blogData),
            });

            const result = await response.json();

            setBlogData(initialBlogData);
            setIsActive(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="min-h-screen min-w-full">
            <section>
                <Button onClick={() => setIsActive(!isActive)}>Add New Blog</Button>
            </section>
            <section className={`fixed top-0 ${!isActive && "hidden"}`}>
                <Model {...{ isActive, setIsActive, blogData, setBlogData, initialBlogData, btnLabel, handleFormSubmit }} />
            </section>
        </main>
    )
}