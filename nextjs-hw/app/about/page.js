import Image from "next/image"

function page() {
    return (
        <section>
            <Image src={"https://images.unsplash.com/photo-1738924349706-14d70715e236?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="nature image" width={500} height={500} />
        </section>
    )
}

export default page