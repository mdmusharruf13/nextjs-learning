## Next.js Learning Documentation

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

### Dynamic and Nested Dynamic Route

```js
app
|_____product
|     |_____[productId]   // dynamic route
|     |     |_____review
|     |     |     |_____[reviewId]   // nested dynamic route
|     |     |     |     |-----page.tsx
|     |     |     |-----page.tsx
|     |     |-----page.tsx
|     |-----page.tsx
|-----layout.tsx
|-----page.tsx


// paths are
localhost:3000/product/352

localhost:3000/product/122/review/4
```

```js
// nested dynamic route example
type ReviewProps = {
  params: Promise<{ productId: string, reviewId: string}>
};

export default async function ReviewIdPage({params}: ReviewProps) {
    const {productId, reviewId} = await params;

    return (
        <section>
            <p>review {reviewId} product {productId}</p>
        </section>
    )
}
```

This is server component, because `async` keyword can only be used with server component but not client component.


### Catch-All Route
A Catch-All route in Next.js is used to match any number of URL segments for a specific route.  

Dynamic Segments can be extended to **catch-all** subsequent segments by adding an ellipsis inside the brackets **[...segmentName]**.

```js
app
|_____docs
|     |_____[...slug]
|     |     |-----page.tsx
|     |-----page.tsx
|-----layout.tsx
|-----page.tsx
```

| Route | Example URL | params |
| ----- | ----------- | ------ |
| /docs/[...slug]/page.tsx | /docs/a | { slug: ['a'] } |
| /docs/[...slug]/page.tsx | /docs/a/b | { slug: ['a', 'b'] } |
| /docs/[...slug]/page.tsx | /docs/a/b/c | { slug: ['a', 'b', 'c'] } |

Any route after `/docs` URL segment will always display only `/docs/[...slug]/page.tsx` file. 

```js
export default async function Docs({params}: {
    params: Promise<{slug: string[]}>
}) {
    const {slug} = await params;

    return <section>
        <p>path is: {slug.join("/")}</p>
    </section>
}
```

### Optional Catch-all Segments

Catch-all Segments can be made **optional** by including the parameter in double brackets: *[[...segmentName]]*. 

For example, `/reviews/[[...slug]]/page.tsx` will also match `/reviews`, in addition to `/reviews/books`, `/reviews/pen/one`, `/reviews/books/bag/355`.

The difference between **catch-all** and **optional catch-all** segments is that with optioal, the route without the parameter is also matched (`/docs` in the example above).

| Route | Example URL | params |
| ----- | ----------- | ------ |
| /reviews/[[...slug]]/page.tsx | /reviews | { slug: undefined } |
| /reviews/[[...slug]]/page.tsx | /reviews/a | { slug: ['a'] } |
| /reviews/[[...slug]]/page.tsx | /reviews/a/b | { slug: ['a', 'b'] } |


```js
export default async function Reviews({params}: {
    params: Promise<{slug: string[]}>
}) {
    const paths = (await params).slug;

    // this will work for /reviews/book, /reviews/pen/two and so on. 
    if(paths?.length) {
        return <p>paths is: {paths.join("/")}</p>
    }

    // this will work for /reviews only
    return <section>
        <p>Welcome to Review page</p>
    </section>
}
```


### not-found page 

not-found page does not accept props.

```js
export default function NotFoundPage() {
    const pathName = usePathname();
    const productId = pathname.split("/")[2];
    const reviewId = pathname.split("/")[4];

    return <section>
        <h2>Review {reviewId} not found for product {productId}</h2>
    </section>
}

```