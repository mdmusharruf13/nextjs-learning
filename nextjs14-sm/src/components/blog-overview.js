"use client";

import { useEffect, useState } from "react";
import Model from "./Model";
import Button from "./Button";
import BlogPost from "./BlogPost";
import { getBlogs } from "@/app/project-list/blog/blog-home/page";

export const initialBlogData = {
    title: "",
    description: "",
    id: ""
};

export const BLOG_ACTION = {
    ADD: {
        path: 'add-blog',
        method: 'POST'
    },
    UPDATE: {
        path: 'update-blog',
        method: 'PUT'
    },
    DELETE: {
        path: 'delete-blog',
        method: 'DELETE'
    },
    GET: {
        path: 'get-blog',
        method: 'GET'
    },
}

export const defaultAction = {
    action: '',
    heading: '',
    btnLabel: ''
}

export default function BlogOverview({ blogs }) {
    const [isActive, setIsActive] = useState(false);
    const [blogData, setBlogData] = useState(initialBlogData);
    const [blogList, setBlogList] = useState([]);
    const [currentAction, setCurrentAction] = useState(defaultAction);

    useEffect(() => {
        if (blogs.success) {
            setBlogList(blogs.data);
        }
    }, []);

    const handleFormSubmit = async () => {
        const { method, path } = currentAction.action;
        const obj = method == 'GET' ? { method } : {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogData),
        }
        try {
            const response = await fetch(`/api/blog/${path}`, obj);

            const result = await response.json();
            console.log("response is :", result);

            setBlogData(initialBlogData);
            setIsActive(false);
            getBlogs().then(res => {
                setBlogList(res.data);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="min-h-screen min-w-full">
            <section>
                <Button onClick={() => {
                    setIsActive(!isActive);
                    setCurrentAction({ action: BLOG_ACTION.ADD, heading: 'Add New Blog', btnLabel: 'Add Blog' })
                }}>Add New Blog</Button>
            </section>
            <section className={`fixed top-0 ${!isActive && "hidden"}`}>
                <Model {...{ isActive, setIsActive, blogData, setBlogData, initialBlogData, handleFormSubmit, setCurrentAction }} currentAction={currentAction} />
            </section>
            <section className="flex flex-col gap-2">
                <BlogPost {...{ blogList, setIsActive, blogData, setBlogData, currentAction, setCurrentAction, handleFormSubmit }} />
            </section>
        </main>
    )
}