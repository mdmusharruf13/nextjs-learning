import { Metadata } from "next";

export default function AboutPage() {
  return (
    <section>
      <p>this is about page</p>
    </section>
  );
}

// static metadata
export const metadata: Metadata = {
  title: "About page"
}