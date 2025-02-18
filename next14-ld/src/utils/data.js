import { connectToDB } from "./connectToDb"

export const getPosts = async () => {
    try {
        const db = await connectToDB();
        const usersColls = db.collection("posts");
        const result = await usersColls.find().toArray();
        return result;

    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to fetch posts!");
    }
}
export const getPost = async (slug) => {
    try {
        const db = await connectToDB();
        const postsColls = db.collection("posts")
        const result = await postsColls.find(slug).toArray();
        return result;
    }
    catch (error) {
        console.error(error);
        throw new Error("Failed to fetch posts!");
    }
}

export const getUser = async (id) => {
    try {
        const db = await connectToDB();
        const userColls = db.collection("users");
        const result = await userColls.find().toArray();
        return result.filter(user => user._id == id);
    } catch (error) {
        console.log(error);
    }
} 