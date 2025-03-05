import { UserContext } from "@/app/project-list/user-management/page";
import Button from "@/components/Button";
import { MODEL_STATE } from "@/util/user-helper";
import { useContext } from "react";

export default function SingleUserCard({ user }) {

    const { setOpenModel, setModelInfo, setUserData, deleteSingleUser } = useContext(UserContext);
    return (
        <section className="shadow-md border p-4 rounded-md flex flex-col gap-3 max-w-fit">
            <section>
                <p><b>Name</b>: {user.firstName} {user.lastName}</p>
                <p><b>Email</b>: {user.email}</p>
                <p><b>Address</b>: {user.address}</p>
            </section>
            <section className="flex gap-2">
                <Button onClick={(e) => {
                    setModelInfo(MODEL_STATE.UPDATE);
                    setOpenModel(prev => !prev);
                    setUserData(user);
                }}>Update</Button>
                <Button onClick={(e) => {
                    e.preventDefault();
                    deleteSingleUser(user._id);
                }}>Delete</Button>
            </section>
        </section>
    )
}