"use server";

import connectToDB from "@/database/blogdb";
import AuthUsers from "@/model/authUser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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

export async function loginUser(formData) {
    await connectToDB();
    try {
        const { email, password } = formData;

        const user = await AuthUsers.findOne({ email });
        if (!user) {
            return {
                success: false,
                message: "user does not exist! please sign up",
                newUser: true
            }
        }

        const checkPswd = await bcrypt.compare(password, user.password);
        if (!checkPswd) {
            return {
                success: false,
                message: "Password is incorrect please check",
                incorrectPassword: true
            }
        }

        const createdTokenData = {
            id: user._id,
            userName: user.userName,
            email: user.email
        };

        const token = jwt.sign(createdTokenData, 'DEFAULT_KEY', { expiresIn: '1d' })

        const getCookies = await cookies();
        getCookies.set("token", token);
        console.log("cookie is : ", getCookies.get('token'));

        return {
            success: true,
            message: "login successfull",
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: "user does not exist! please sign up"
        }
    }
}

export async function fetchAuthUser() {
    try {
        await connectToDB();


        const cookiesList = await cookies();
        const token = cookiesList.get("token")?.value || "";

        if (token == "") {
            return {
                success: false,
                messge: "Token is invalid"
            }
        }

        const decodedToken = jwt.verify(token, 'DEFAULT_KEY');
        const getUserInfo = await AuthUsers.findOne({ _id: decodedToken.id });

        if (getUserInfo) {

            return {
                success: true,
                message: "successfully fetched user data",
                data: JSON.parse(JSON.stringify(getUserInfo))
            }
        } else {
            return {
                success: false,
                message: "Some error occured ! Please try again"
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export async function logoutUser() {
    const cookiesList = await cookies();
    cookiesList.delete("token");
    console.log(cookiesList.get("token")?.value, " is token");
    if (!cookiesList.get("token")?.value) {
        return {
            success: true,
            message: "logout successful"
        }
    } else {
        return {
            success: false,
            message: "failed to logout | please try again"
        }
    }
}