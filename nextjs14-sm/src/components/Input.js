export default function Input({ type, placeholder, name }) {
    return <>
        <input type={type} placeholder={placeholder} id={name} required className="border border-gray-400 rounded-md py-2 px-3 " />
    </>
}