"use client";


import { useEffect, useState } from "react";
import Model from "./Model";
import Button from "./Button";

const initialBlogData = {
    title: "",
    description: ""
};

export default function BlogOverview({ blogs }) {
    const [isActive, setIsActive] = useState(false);
    const [blogData, setBlogData] = useState(initialBlogData);
    const [btnLabel, setBtnLabel] = useState("Add Blog");
    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        if (blogs.success) {
            setBlogList([...blogs.data])
        }
    }, []);


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
            <section className="flex flex-col gap-2">
                {blogList?.length && blogList.map(blog => (
                    <section key={blog._id.toString()} className="border border-black">
                        <h2 className="font-bold">{blog.title}</h2>
                        <p>{blog.description}</p>
                    </section>
                ))}
            </section>
        </main>
    )
}