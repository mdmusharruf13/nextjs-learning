import Image from "next/image";
import "../utils/classes.css";

export default function Home() {
  return (
    <section className="flex">
      <section className="flex flex-col gap-4">
        <section>
          <p className="heading-lg">Creative Thoughts Agency.</p>
        </section>
        <section className="flex flex-col gap-2">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
            voluptatem et ipsa dicta doloribus sit deserunt. Molestiae porro
            sequi labore, explicabo accusamus consequatur molestias laudantium
            mollitia ullam voluptatibus ab commodi.
          </p>
          <section className="flex gap-1">
            <button className="btn-sm bg-blue text-white">Learn More</button>
            <button className="btn-sm">Contact</button>
          </section>
        </section>
      </section>
      <section>
        <Image
          src={"/creativity.gif"}
          alt="gif image"
          width={700}
          height={500}
        />
      </section>
    </section>
  );
}
