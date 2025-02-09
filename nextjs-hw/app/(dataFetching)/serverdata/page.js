async function fetchData() {
    let data = await fetch("https://jsonplaceholder.typicode.com/posts");
    data = await data.json();
    return data;
}

async function ServerData() {
    let products = await fetchData();
    return (
        <section>
            {products && products.map(obj => {
                return <p key={obj.id}>{obj.title}</p>
            })}
        </section>
    )
}

export default ServerData