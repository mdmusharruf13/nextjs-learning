"use server";

import connectToDB from "@/database/blogdb";
import User from "@/model/user";

// save new user
export async function addNewUser(user) {
    try {
        await connectToDB();

        const user = await User.create(user);
        if (user) {
            console.log(user);
            return {
                success: true,
                message: "user added successfully"
            }
        }

        return {
            success: false,
            message: "something went wrong please try again"
        }

    } catch (err) {
        return {
            success: false,
            message: "something went wrong please try again"
        }
    }
}