"use client";

import AddNewUserCard from "@/components/add-new-user-card";
import CustomModel from "@/components/CustomModel";
import { initialModelInfo, initialUserData, userFormInputs } from "@/util/user-helper";
import { createContext, useEffect, useState } from "react";
import { addNewUser, getAllUsers } from "@/actions/user-management"
import SingleUserCard from "@/components/Single-user-card";

export const UserContext = createContext(null);


export default function UserManagementPage() {
    const [userData, setUserData] = useState(initialUserData);
    const [modelInfo, setModelInfo] = useState(initialModelInfo);
    const [openModel, setOpenModel] = useState(false);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const fetchUsers = async () => {
            const userList = await getAllUsers();
            console.log("userList", userList);
            setUsers(userList.data);
        }
        fetchUsers();
    }, []);

    function addNewUserData(event) {
        event.preventDefault();
        addNewUser(userData);
        setUserData(initialUserData);
        setOpenModel(prev => !prev);
    }


    return <UserContext.Provider value={{ userData, modelInfo, setModelInfo, setUserData, userFormInputs, setOpenModel, addNewUserData }}>
        <section className="w-[90%] mx-auto flex flex-col gap-4">

            <section className="mt-4 flex justify-between">
                <h1 className="text-2xl font-bold">User Management</h1>
                <AddNewUserCard />
            </section>

            <section className={`${!openModel && "hidden"} w-screen  backdrop-blur-sm absolute min-h-screen top-0 flex justify-center items-center`}>
                <CustomModel />
            </section>

            <section className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">USER LIST</h2>
                <section className="flex flex-wrap gap-4">
                    {users.map((user) => (
                        <section key={user._id}>
                            <SingleUserCard user={user} />
                        </section>
                    ))}
                </section>
            </section>

        </section>
    </UserContext.Provider>
}