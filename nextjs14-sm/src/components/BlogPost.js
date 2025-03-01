import { useEffect, useState } from "react";

export default function BlogPost({ blogList }) {

    return (
        <>
            {blogList?.length && blogList.map(blog => (
                <section key={blog._id.toString()} className="border border-black m-2 p-2 rounded-md">
                    <h2 className="font-bold text-xl">{blog.title}</h2>
                    <p>{blog.description}</p>
                </section>
            ))}
        </>
    )
}