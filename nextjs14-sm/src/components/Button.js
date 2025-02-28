export default function Button({ children, ...param }) {
    return <>
        <button {...param} className="font-semibold text-white bg-black hover:bg-gray-900 px-5 py-2 rounded-md">{children}</button>
    </>
}