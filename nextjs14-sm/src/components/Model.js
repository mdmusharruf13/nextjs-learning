import Button from "./Button";

export default function Model({ isActive, setIsActive, initialBlogData, blogData, setBlogData, btnLabel, handleFormSubmit }) {

    return <section className={`min-h-screen w-screen bg-transparent transition-all backdrop-blur-sm duration-300 ${!isActive && "hidden"}`}>
        <section className="w-[450px] h-[350px] mx-auto bg-gray-100  flex flex-col justify-between px-10 py-8 rounded-lg absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <section className="flex justify-between">
                <h1 className="font-bold text-2xl">Add New Blog</h1>
                <p
                    className="text-2xl font-bold border border-black rounded-lg px-2 bg-black text-white hover:rounded-full cursor-pointer transition-all duration-200 ease-in-out "
                    onClick={() => setIsActive(!isActive)}
                >
                    x
                </p>
            </section>

            <form className="flex flex-col gap-5" >
                <section className="flex justify-between items-start">
                    <label htmlFor="title" className="font-bold text-lg">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter title"
                        className="py-2 px-4 border hover:border-black rounded-md"
                        value={blogData.title}
                        onChange={(e) => setBlogData(prev => ({ ...prev, title: e.target.value }))}

                    />
                </section>
                <section className="flex justify-between items-start">
                    <label htmlFor="desc" className="font-bold text-lg">Description</label>
                    <textarea
                        id="desc"
                        placeholder="Enter description"
                        rows={4}
                        cols={22}
                        className="py-2 px-4 border hover:border-black rounded-md"
                        value={blogData.description}
                        onChange={(e) => setBlogData(prev => ({ ...prev, description: e.target.value }))}
                        required
                    ></textarea>
                </section>
                <section className="flex justify-end"><Button onClick={handleFormSubmit}>{btnLabel}</Button></section>
            </form>


        </section>
    </section>
}