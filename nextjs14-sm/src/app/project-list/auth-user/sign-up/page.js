"use client";

import { registerNewUser } from "@/actions/auth-user";
import Button from "@/components/Button";
import { initialSignInFormInputs, initialSignInUserInfo } from "@/util/user-helper";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
    const [userData, setUserData] = useState(initialSignInUserInfo);
    const router = useRouter();

    const handleSignInFormSubmission = async (e) => {
        e.preventDefault();
        const result = await registerNewUser(userData);
        if (result.success) router.push("/project-list/auth-user/sign-in");
        else alert("User Exist | Please try with different email...");
        setUserData(initialSignInUserInfo);
    }

    return (
        <section className="bg-gradient-to-r from-green-500 to-blue-400 h-screen pt-16">
            <section className="w-[500px] h-[500px] mx-auto bg-gray-200 flex flex-col gap-8 justify-center items-center rounded-md">
                <h1 className="text-2xl font-bold">SignIn</h1>
                <form className="flex flex-col gap-4">
                    {initialSignInFormInputs.map(inputObj => (
                        <section key={inputObj.name} className="flex gap-8 justify-between">
                            <label htmlFor={inputObj.name} className="text-xl">{inputObj.label}</label>
                            <input
                                type={inputObj.type}
                                id={inputObj.name}
                                placeholder={inputObj.placeholder}
                                value={userData[inputObj.name]}
                                onChange={(e) => setUserData(prev => ({
                                    ...prev,
                                    [inputObj.name]: e.target.value
                                }))}
                                className="border border-black text-xl px-2 py-1 rounded"
                            />
                        </section>
                    ))}
                    <section className="flex justify-center m-4">
                        <Button onClick={handleSignInFormSubmission}> SignIn</Button>
                    </section>
                </form>
            </section>
        </section>
    )


}