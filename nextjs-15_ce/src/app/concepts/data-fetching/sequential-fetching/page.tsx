import Author from "./Author";

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export default async function ParallelFetching() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    let posts = await response.json();

    posts = posts.filter((post: Post) => post.id < 10);

    return (
        <section>
            <ul className="flex flex-col gap-3 mb-2 mt-2">
                {posts.map((post: Post) => {
                    return <li key={post.id} className="border border-black rounded-lg p-2 flex flex-col gap-3">
                        <section>
                        <p className="font-bold">{post.title}</p>
                        <p>{post.body}</p>
                        </section>
                        <Author id={post.id} />
                    </li>
                })}
            </ul>
        </section>
    )
}