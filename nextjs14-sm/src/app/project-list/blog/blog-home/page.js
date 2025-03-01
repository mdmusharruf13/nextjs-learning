import BlogOverview from "@/components/blog-overview";

async function getBlogs() {
    try {
        const response = await fetch("http://localhost:3000/api/blog/get-blog", {
            method: 'GET',
            cache: 'no-store'
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}

export default async function BlogHomePage() {

    const blogs = await getBlogs();
    console.log(blogs);
    return (
        <>
            <BlogOverview blogs={blogs} />
        </>
    )
}