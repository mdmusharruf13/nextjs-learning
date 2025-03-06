"use server";

import connectToDB from "@/database/blogdb";
import AuthUsers from "@/model/authUser";
import bcrypt from "bcryptjs";

export async function registerNewUser(formData) {
    try {
        await connectToDB();

        const { userName, email, password } = formData;
        console.log("server log: ", formData)

        let user = await AuthUsers.findOne({ email });
        if (user) {
            return {
                success: false,
                message: "User already exists! Please try with different email"
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashPswd = await bcrypt.hash(password, salt);

        const newlyCreatedUser = new AuthUsers({
            userName, email, password: hashPswd
        });

        const savedUser = await newlyCreatedUser.save();

        if (savedUser) {
            return {
                success: true,
                data: JSON.parse(JSON.stringify(savedUser))
            }
        }

        return {
            success: false,
            message: "User already exists! Please try with different email"
        }

    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "something went wrong ! Please try again later"
        }
    }
}