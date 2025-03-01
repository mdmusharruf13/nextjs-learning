"use client";

import { useEffect, useState } from "react";
import Model from "./Model";
import Button from "./Button";
import BlogPost from "./BlogPost";
import { getBlogs } from "@/app/project-list/blog/blog-home/page";

const initialBlogData = {
    title: "",
    description: ""
};

export const BLOG_ACTION = {
    ADD: 'add-blog',
    UPDATE: 'update-blog',
    DELETE: 'delete-blog',
    GET: 'get-blog',
}

export default function BlogOverview({ blogs }) {
    const [isActive, setIsActive] = useState(false);
    const [blogData, setBlogData] = useState(initialBlogData);
    const [btnLabel, setBtnLabel] = useState("Add Blog");
    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        if (blogs.success) {
            setBlogList(blogs.data);
        }
    }, []);

    useEffect(() => {
        if (!isActive) {
            getBlogs().then(res => {
                setBlogList(res.data);
            });
        }
    }, [isActive]);

    const handleFormSubmit = async (action) => {
        try {
            const response = await fetch(`/api/blog/${action}`, {
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
                <Model {...{ isActive, setIsActive, blogData, setBlogData, initialBlogData, btnLabel, handleFormSubmit }} actionType={BLOG_ACTION.ADD} />
            </section>
            <section className="flex flex-col gap-2">
                <BlogPost blogList={blogList} />
            </section>
        </main>
    )
}