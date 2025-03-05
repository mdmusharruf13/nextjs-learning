"use server";

import mongoose from "mongoose";

import connectToDB from "@/database/blogdb";
import User from "@/model/user";

// save new user
export async function addNewUser(userData) {
    try {
        await connectToDB();

        const user = await User.create(userData);
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
    } finally {
        mongoose.disconnect();
    }
}