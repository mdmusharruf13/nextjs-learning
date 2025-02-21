import { connectToDB } from "./connectToDb";

export const addPost = async (formData) => {
    "use server";

    // const title = formData.get("title");
    // const desc = formData.get("desc");
    // const slug = formData.get("slug");

    let { title, desc: description, slug, userId } = Object.fromEntries(formData);

    console.log(title, description, slug, userId);

    try {
        const db = await connectToDB();
        const collection = db.collection('posts');
        const insertedResult = await collection.insertOne({ userId, title, description, slug })
        console.log(insertedResult);
    } catch (error) {
        console.log(error);
    }
};