import { UserContext } from "@/app/project-list/user-management/page"
import { useContext } from "react"
import Button from "./Button";

export default function CustomModel() {
    const { userData, setUserData, modelInfo, userFormInputs, setOpenModel, modelDataSubmit } = useContext(UserContext);

    return <section className={`w-[500px] h-[50vh] bg-gray-100 border border-gray-400 rounded-md flex flex-col gap-6 p-6`}>
        <section className="flex justify-between">
            <h1 className="text-2xl font-bold">{modelInfo.title}</h1>
            <div onClick={() => { setOpenModel(prev => !prev) }} className="font-bold text-xl border border-gray-300 px-2 bg-gray-300 rounded-md hover:bg-gray-400 cursor-pointer"><span>x</span></div>
        </section>
        <form className="flex flex-col h-full justify-between p-4 ">
            {userFormInputs && userFormInputs.map(form => (
                <section key={form.name} className="flex items-end justify-between">
                    <label htmlFor={form.name}>{form.label}</label>
                    <input
                        type={form.type}
                        placeholder={form.placeholder}
                        id={form.name}
                        required
                        value={userData[form.name]}
                        onChange={(e) => setUserData(prev => ({ ...prev, [form.name]: e.target.value }))}
                        className="border border-gray-400 rounded-md py-2 px-3 "
                    />
                </section>
            ))}
            <section className="flex justify-center">
                <Button onClick={(e) => { modelDataSubmit(e) }} type={"button"}>{modelInfo.btnLabel}</Button>
            </section>
        </form>
    </section>
}