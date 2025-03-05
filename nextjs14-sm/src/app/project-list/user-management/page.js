"use client";

import AddNewUserCard from "@/components/add-new-user-card";
import CustomModel from "@/components/CustomModel";
import { initialModelInfo, initialUserData, MODEL_STATE, userFormInputs } from "@/util/user-helper";
import { createContext, useEffect, useState } from "react";
import { addNewUser, getAllUsers, updateUser } from "@/actions/user-management"
import SingleUserCard from "@/components/Single-user-card";

export const UserContext = createContext(null);


export default function UserManagementPage() {
    const [userData, setUserData] = useState(initialUserData);
    const [modelInfo, setModelInfo] = useState(initialModelInfo);
    const [openModel, setOpenModel] = useState(false);
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        const fetchUserList = async () => {
            const userList = await getAllUsers();
            console.log("fetcheUsers() - userList", userList);
            setUsers(userList.data);
        }
        fetchUserList();
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    function addNewUserData() {
        addNewUser(userData);
        setUserData(initialUserData);
        setOpenModel(prev => !prev);
        fetchUsers();
    }

    async function updateUserData() {
        const result = await updateUser(userData);
        console.log("result", result);
        setUserData(initialUserData);
        setOpenModel(prev => !prev);
        fetchUsers();
    }

    function modelDataSubmit(e) {
        e.preventDefault();
        if (modelInfo.title == MODEL_STATE.ADD.title) {
            addNewUserData();
        } else if (modelInfo.title == MODEL_STATE.UPDATE.title) {
            updateUserData();
        }
    }

    return <UserContext.Provider value={{ userData, modelInfo, setModelInfo, setUserData, userFormInputs, setOpenModel, modelDataSubmit }}>
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