"use client";

import { loginUser } from "@/actions/auth-user";
import Button from "@/components/Button";
import { initialLogInFormInputs, initialLogInUserInfo } from "@/util/user-helper";
import { useState } from "react";

export default function SignInPage() {
    const [userData, setUserData] = useState(initialLogInUserInfo);

    const handleUserLogin = async (e) => {
        e.preventDefault();
        const loginResult = await loginUser(userData);
        console.log("userData", userData, "loginResult", loginResult);
        setUserData(initialLogInUserInfo);


    }
    return <section className="h-screen bg-gradient-to-r from-orange-400 to-gray-400 pt-16">
        <section className="w-[500px] h-[500px] mx-auto bg-gray-200 flex flex-col justify-center items-center gap-8 rounded-md">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <form className="flex flex-col gap-6">
                {
                    initialLogInFormInputs.map(formInput => (
                        <section className="flex gap-8 justify-between" key={formInput.name}>
                            <label className="text-xl" htmlFor={formInput.name}>{formInput.label}</label>
                            <input
                                type={formInput.type}
                                id={formInput.name}
                                name={formInput.name}
                                placeholder={formInput.placeholder}
                                value={userData[formInput.name]}
                                onChange={(e) => {
                                    setUserData(prev => ({
                                        ...prev,
                                        [e.target.name]: e.target.value
                                    }))
                                }}
                                className="text-xl px-2 py-1 rounded outline-none"
                            />
                        </section>
                    ))
                }
                <section className="flex justify-center m-4">
                    <Button type="button" onClick={handleUserLogin}>Login</Button>
                </section>
            </form>
        </section>
    </section>
}