"use client";

import { createContext, useState } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function DashboardLayout({
    children, user, revenue, notifications, login
}: {
    children: React.ReactNode,
    user: React.ReactNode,
    revenue: React.ReactNode,
    notifications: React.ReactNode,
    login: React.ReactNode,
}) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return <>
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
        {isLoggedIn ? (
        <section>
            <section>{children}</section>
            <section className="flex gap-2">
            <section className="flex flex-col gap-1">
                <article className="min-w-[200px] min-h-[200px] border border-gray-400 rounded-md">{user}</article>
                <article className="min-w-[200px] min-h-[200px] border border-gray-400 rounded-md">{revenue}</article>
            </section>
            <section>
                <article className="min-w-[200px] min-h-[400px] border border-gray-400 rounded-md">{notifications}</article>
            </section>
        </section>
        </section>
    ) : <section>{login}</section>}
        </AuthContext.Provider>
    </>
}