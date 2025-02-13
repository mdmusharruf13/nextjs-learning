import Image from "next/image";

export default function about() {
  return (
    <section>
      <Image
        src={"/introImage.png"}
        alt="about image"
        width={500}
        height={500}
      />
      <Image
        src={
          "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJvbnQlMjBlbmQlMjBkZXZlbG9wZXJ8ZW58MHx8MHx8fDA%3D"
        }
        alt="coding image"
        width={500}
        height={500}
      />
    </section>
  );
}
