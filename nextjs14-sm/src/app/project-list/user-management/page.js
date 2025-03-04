"use client";

import AddNewUserCard from "@/components/add-new-user-card";
import CustomModel from "@/components/CustomModel";
import { initialModelInfo, initialUserData, userFormInputs } from "@/util/user-helper";
import { createContext, useEffect, useState } from "react";
import { addNewUser } from "@/actions/user-management"

export const UserContext = createContext(null);


export default function UserManagementPage() {
    const [userData, setUserData] = useState(initialUserData);
    const [modelInfo, setModelInfo] = useState(initialModelInfo);
    const [openModel, setOpenModel] = useState(false);

    useEffect(() => {
        console.log(openModel);
        if (openModel) console.log(modelInfo);
        if (!openModel) console.log(userData);
    }, [modelInfo, openModel]);

    function addNewUserData(event) {
        event.preventDefault();
        console.log("userData", userData);
        addNewUser(userData);
        setUserData(initialUserData);
        console.log("user added successfully");
        setOpenModel(prev => !prev);
    }



    return <UserContext.Provider value={{ userData, modelInfo, setModelInfo, setUserData, userFormInputs, setOpenModel, addNewUserData }}>
        <section>
            <section className="m-4 flex justify-between">
                <h1 className="text-2xl font-bold">User Management</h1>
                <AddNewUserCard />
            </section>

            <section className={`${!openModel && "hidden"} w-screen  backdrop-blur-sm absolute min-h-screen top-0 flex justify-center items-center`}>
                <CustomModel />
            </section>
        </section>
    </UserContext.Provider>
}