export default async function IDPage({ params }) {
  const paramsData = await params;
  console.log(paramsData);
  return <section>the dynamic value is {paramsData.id}.</section>;
}
