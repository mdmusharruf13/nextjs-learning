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


export async function getAllUsers() {
    try {
        await connectToDB();

        const allUsers = await User.find({});
        if (allUsers) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(allUsers))
            }
        }

        return {
            success: false,
            message: "something went wrong please try again later"
        }

    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "something went wrong please try again later"
        }
    } finally {
        mongoose.disconnect()
    }
}

export async function updateUser(userData) {
    try {
        await connectToDB();

        const user = await User.findByIdAndUpdate(userData._id, userData);
        if (user) {
            return {
                success: true,
                message: "user updated successfully"
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