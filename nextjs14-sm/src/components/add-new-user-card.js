import { useContext } from "react";
import Button from "./Button";
import { MODEL_STATE } from "@/util/user-helper";
import { UserContext } from "@/app/project-list/user-management/page";



export default function addNewUserCard() {
    const { setModelInfo, setOpenModel } = useContext(UserContext);

    return <section>
        <section>
            <Button onClick={() => {
                setModelInfo(MODEL_STATE.ADD);
                setOpenModel(prevState => !prevState);
            }}>
                Add New User
            </Button>
        </section>
    </section>
}