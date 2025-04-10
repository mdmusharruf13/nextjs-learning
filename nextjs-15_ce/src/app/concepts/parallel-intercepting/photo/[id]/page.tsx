import { data } from "../../data";

export default async function PhotoId({params} : {
    params: Promise<{id:number}>
}) {

    const {id} = await params;
    const dataObj = data.find(obj => obj.id == id);

    return (
        <section className="flex justify-center items-center">
            <section className="min-h-[50vh] min-w-1/2 flex justify-center items-center rounded-md text-2xl" style={{
                backgroundColor: `${dataObj?.color}`,
                color: 'white',
                fontWeight: 'bold'
            }}>
                <p>{dataObj?.text}</p>
            </section>
        </section>
    )
}