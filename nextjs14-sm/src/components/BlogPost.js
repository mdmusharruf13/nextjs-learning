import { useEffect } from "react";
import { BLOG_ACTION, defaultAction, initialBlogData } from "./blog-overview";
import Button from "./Button";

export default function BlogPost({ blogList, setIsActive, blogData, setBlogData, setCurrentAction, handleFormSubmit, currentAction }) {

    const handleUpdate = (blog) => {
        setCurrentAction({
            action: BLOG_ACTION.UPDATE,
            heading: 'Update Blog',
            btnLabel: 'Update Changes'
        });
        setIsActive(prev => !prev);
        const { title, description, _id } = blog;
        setBlogData({ title, description, id: _id.toString() });
    }

    const handleDelete = (id) => {
        setCurrentAction({
            ...defaultAction,
            action: BLOG_ACTION.DELETE
        });
        setBlogData({ ...initialBlogData, id })
        console.log(id);
    }

    useEffect(() => {
        if (currentAction.action == BLOG_ACTION.DELETE && blogData.id.length > 0) {
            handleFormSubmit();
        }
    }, [blogData.id]);

    return (
        <>
            {blogList?.length && blogList.map(blog => (
                <section key={blog._id.toString()} className="border border-black m-2 p-2 rounded-md flex justify-between gap-2">
                    <section>
                        <h2 className="font-bold text-xl">{blog.title}</h2>
                        <p>{blog.description}</p>

                    </section>
                    <section className="flex flex-col gap-1">

                        <Button onClick={() => handleUpdate(blog)}>Update Blog</Button>
                        <Button onClick={() => handleDelete(blog._id.toString())}>Delete Blog</Button>
                    </section>
                </section>
            ))}
        </>
    )
}