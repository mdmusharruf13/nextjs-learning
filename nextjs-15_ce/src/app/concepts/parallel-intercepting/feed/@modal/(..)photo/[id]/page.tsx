"use client";

import { data } from "@/app/concepts/parallel-intercepting/data";
import { useRouter } from "next/navigation";
import { use, useRef } from "react";

export default function PhotoId({params} : {
    params: Promise<{id:number}>
}) {

    const {id} = use(params);
    
    const dataObj = data.find(obj => obj.id == id);

    const modelRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if(modelRef.current && !modelRef.current.contains(e.target as Node)) {
            router.back();
        } else {
            window.location.reload();
        }
    }

    return (
        <section 
            className="absolute top-0 left-0 min-w-screen min-h-screen backdrop-brightness-90 flex justify-center items-center backdrop" onClick={handleClick}
        >
            <div className="bg-white w-[400px] h-[400px] rounded-md flex justify-center items-center cursor-pointer" style={{
                backgroundColor: `${dataObj?.color}`,
                color: 'white',
                fontWeight: 'bold'
            }} ref={modelRef}>
            <p>photo {dataObj?.text}</p>
            </div>
        </section>
    )
}