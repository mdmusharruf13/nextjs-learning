## Next.js

### Routing

Next.js has a file-system based routing system.

URLs you can access in your browser are determined by how you organize your files and folder in your code.

### Routing conventions

1. All routes must live inside the app folder.

2. Route file must be named either page.js or page.tsx.

3. Each folder represents a segment of the URL path.

When these conventions are followed, the file automatically becomes available as a route.

## React Server Components (RSC)

- Server Components
- Client Components

### Server Components

- By default, Next.js treats all components as Server components.

- The components can perform server-side tasks like reading files or fetching data directly from a database.

- The trade-off is that they can't use React hooks or handle user interactions.

```js
export default async function ServerPage() {
  const userData = await fetchUsers();

  return <section> ... </section>;
}
```

### Client Components

- To create a Client component, you'll need to add the "use client" directive at the top of your component file.

- While Client components can't perform server-side tasks like reading files, they can use hooks and handle user interactions.

```js
"use client";
import { useState } from "react";

export default async function ClientPage() {
  const [users, setUser] = useState([]);
  return <section> ... </section>;
}
```

### Nested Routes

Nested routes are a way to create a hierarchy of routes in your appliation.

```js
app
|_____blog
|     |_____first
|     |     |-----page.tsx
|     |_____second
|     |     |-----page.tsx
|     |-----page.tsx
|-----layout.tsx
|-----page.tsx


// all paths are
localhost:3000/

localhost:3000/blog

localhost:3000/blog/first

localhost:3000/blog/second
```
