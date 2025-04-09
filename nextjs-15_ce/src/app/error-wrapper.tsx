"use client";

import { useState } from "react";

interface WrapperProps {
    children: React.ReactNode
}

const ErrorSimulator = ({message = 'An error occured'} : {
    message?: string 
}) => {
    const [error, setError] = useState(false);

    if(error) {
        throw new Error(message ||"error due to click of button");
    }

    return (
        <section>
            <button
                title="Simulate error"
                className="bg-gray-300 p-1 rounded-md cursor-pointer" 
                onClick={() => setError(true)}
            >Simulate Error</button>
        </section>
    )
}

export default function ErrorWrapper({children}: WrapperProps) {
    

    return (
        <section className="flex flex-col rounded-lg mt-8 p-4 border border-gray-300">
            <section>
                <ErrorSimulator message="Simulated error in root layout" />
            </section>
            {children}   
        </section>
    )
}