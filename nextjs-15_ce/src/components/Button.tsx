import React from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
};

export default function Button({children, ...props}: ButtonProps) {
    return (
        <button 
            {...props} 
            className="bg-gray-300 rounded-md px-[15px] py-[5px] cursor-pointer"
        >
            {children}
        </button>
    )
}