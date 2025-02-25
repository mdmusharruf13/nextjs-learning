import { redirect } from "next/navigation";

export default function AboutPage() {
    const userProfileInfo = null;

    if (userProfileInfo === null) redirect("/contact");
    return (
        <section>this is about us page</section>
    )
}