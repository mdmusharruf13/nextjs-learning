async function getUser(id) {
    try {
        const response = await fetch(`https://dummyjson.com/users/${id}`)
        const result = await response.json();

        return result;
    } catch (error) {
        throw new Error(error);
    }

}

export default async function DetailsPage({ params }) {
    const newParams = await params;

    const user = await getUser(newParams.details);
    console.log(user);

    return <section>
        <p>Name: {user.firstName} {user.lastName}</p>
        <p>Age: {user.age}</p>
        <p>Gender: {user.gender}</p>
        <img src={user.image} alt="user-image" />
    </section>
}