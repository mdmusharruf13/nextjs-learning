import { BLOG_ACTION } from "./blog-overview";
import Button from "./Button";

export default function BlogPost({ blogList, setIsActive, setBlogData, setCurrentAction, handleFormSubmit }) {

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

    return (
        <>
            {blogList?.length && blogList.map(blog => (
                <section key={blog._id.toString()} className="border border-black m-2 p-2 rounded-md">
                    <h2 className="font-bold text-xl">{blog.title}</h2>
                    <p>{blog.description}</p>
                    <Button onClick={() => handleUpdate(blog)}>Update Blog</Button>
                </section>
            ))}
        </>
    )
}