type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
};

export default async function UserServer() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users: User[] = await response.json();
    console.log(users);

    return (
            <ul>
                {users.map(user => (
                    <li 
                        key={user.id}
                        className="p-4 bg-white shadow-md rounded-lg text-gray-700"
                    >
                        <p className="font-bold">{user.name}</p>
                        <section>
                            <p>Username: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                        </section>
                    </li>
                ))}
            </ul>
    )
}