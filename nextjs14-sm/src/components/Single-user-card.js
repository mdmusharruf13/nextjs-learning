import Button from "@/components/Button";

export default function SingleUserCard({ user }) {
    return (
        <section className="shadow-md border p-4 rounded-md flex flex-col gap-3 max-w-fit">
            <section>
                <p><b>Name</b>: {user.firstName} {user.lastName}</p>
                <p><b>Email</b>: {user.email}</p>
                <p><b>Address</b>: {user.address}</p>
            </section>
            <section className="flex gap-2">
                <Button>Update</Button>
                <Button>Delete</Button>
            </section>
        </section>
    )
}