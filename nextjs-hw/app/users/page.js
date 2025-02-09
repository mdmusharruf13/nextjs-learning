import { Caveat, Indie_Flower, Source_Sans_3 } from "next/font/google";


const srcSans = Source_Sans_3({ subsets: ['latin'], weight: "500" })
const indieFlower = Indie_Flower({ subsets: ['latin'], weight: "400" })
function Users() {
    return (
        <section>
            <p className={srcSans.className}>This is users page with Roboto Font</p>
            <p className={`${indieFlower.className} text-2xl`}>This is Indie_Flower font</p>

        </section>
    )
}

export default Users

export const metadata = () => {
    return {
        title: "This is user page",
        description: "All about the user"
    };
};