"use client";

import Image from "next/image";
import "../utils/classes.css";
import dynamic from "next/dynamic";

const HydrationTestNoSSR = dynamic(() => import("@/components/HydrationTest"), {
  ssr: false,
});

export default function Home() {
  const num = Math.random();
  return (
    <section className="homeContainer">
      <section className="flex flex-col gap-4">
        <section>
          <p className="heading-lg">Creative Thoughts Agency.</p>
        </section>
        <section className="flex flex-col gap-2">
          <p>
            <HydrationTestNoSSR />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque
            voluptatem et ipsa dicta doloribus sit deserunt. Molestiae porro
            sequi labore, explicabo accusamus consequatur molestias laudantium
            mollitia ullam voluptatibus ab commodi.
            <span suppressHydrationWarning>{num}</span>
          </p>
          <section className="flex gap-1">
            <button className="btn-sm bg-blue text-white">Learn More</button>
            <button className="btn-sm">Contact</button>
          </section>
        </section>
      </section>
      <section className="imageContainer">
        <Image
          src={"/creativity.gif"}
          alt="gif image"
          width={700}
          height={500}
          className="img"
        />
      </section>
    </section>
  );
}
