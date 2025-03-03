"use server";

import connectToDB from "@/database/blogdb";
import User from "@/model/user";

// save new user
export async function addNewUser(user) {
    try {
        await connectToDB();

        const User = await User.create(user);
        if (User) {
            console.log(User);
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