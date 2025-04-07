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


### Private folder

Using underscore(_) before the folder name will be considered as private folder.

Private folder are super useful for a bunch of things:
 - Keeping your UI logic seperate from routing logic.
 - Having a consistent way to organize internal files in your project.
 - Making it easier to group related files in your code editor.
 - Avoiding potential naming conflicts with future Next.js file naming conventions.


### Rotue Group

**Route Group** prevent folder from being included in the route's URL path.

This allows you to organize your route segments and project files into logical groups without affecting the URL path structure.

A route group can be created by wrapping a folder's name in parenthesis: (**folderName**).

Route groups are useful for organizing routes into groups e.g. by site section, intent, or team.

```js
app/
|_____(shop)/
|     |-----layout.tsx
|     |_____checkout/           //-> /checkout
|     |     |-----page.tsx
|     |_____cart/               //-> /cart
|     |     |-----page.tsx
|_____account/                 //-> /account
|     |-----page.tsx
```

Even though the `checkout` and `cart` folders are nested inside `shop` folder, but they are available at root level as the `shop` folder is **Group Route** it is exculded from the routing.

All possible routes are `/checkout`, `/cart`, and `/account`.


### Layout

Pages are route-specific UI components.

A Layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not rerender. 

You can define a layout by default exporting a React component from a **layout file**. The component should accept a **children** prop which can be a page or another **layout**.

You can define multiple layouts for different pages.

[see layout example](/src/app/layout.tsx)

If you want multiple root layout then remove root layout from the root directory and add in every first level nested directory (this can be achieved using **Route Group**).


```js
app/
|_____(auth)/
|     |-----layout.tsx
|     |_____login/
|     |     |-----page.tsx
|     |_____signup/
|     |     |-----page.tsx
|-----page.tsx
|_____(product)/
|     |-----layout.tsx
|     |_____checkout/
|     |     |-----page.tsx
|     |_____cart/
|     |     |-----page.tsx
|-----page.tsx
```


### Routing metadata

The Metadata API in Next.js is a powerful fetaure that lets us define metadata for each page.

Metadata ensures our content looks great when it's shared or indexed by search engines.

Two ways to handle metadata in layout.tsx or page.tsx files:
  - export a static **metadata** object.
  - export a dynamic **generateMetadata** function.


### Configuring metadata

**Metadata rules :**
  - Both layout.tsx and page.tsx can export metadata. Layout metadata applies to all its pages, while page metadata is specific to that page.

  - Metadata follows a top-down order, starting from the root level.

  - When metadata exist in multiple places along a route, they merge together, with page metadata overriding layout metadata for matching properties.


```js
import { Metadata } from "next";

// static metadata
export const metadata: Metadata = {
  title: "About page"
}


// dynamic metadata
export const generateMetadata = async ({params} : {
    params: Promise<{ productId: string}>
}):  Promise<Metadata> => {
  const id = (await params).productId;

  return {
    title: `product ${id}`
  }
}
```

**Note:** It will not work in the pages that is marked as "use client". If you try to use it then you will get below error.

```js
Error: You are attempting to export "generateMetadata" from a component marked "use client", which is disallowed. Either remove the export, or the "use client" directive.
```


### Link component navigation

For client-side navigation, Next.js gives us the <Link> component.

The `<Link>` component is a React component that extends the HTML `<a>` element, and it's the primary way to navigate between routes in Next.js.

To use it, you have to import if from "next/link".

```js
import Link from "next/link";

<Link href="path">home</Link>

```