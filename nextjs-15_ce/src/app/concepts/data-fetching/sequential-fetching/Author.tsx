export default async function Author({id}: {id: number}) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await response.json();

    return (
        <p><b className="text-sm">{user.name}</b></p>
    )
}