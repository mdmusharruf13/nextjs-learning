const headings = ["Dynamic Routes"];

export default function ConceptsPage() {
  return (
    <section>
      <h1>List of Concepts: </h1>
      <ul>
        {headings.map((heading) => (
          <li key={heading}>{heading}</li>
        ))}
      </ul>
    </section>
  );
}
