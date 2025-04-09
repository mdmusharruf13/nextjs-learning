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


### params and searchParams

For a given URL,

**params** is a promise that resolves to an object containing the dynamic route parameters (like `id`).

**searchParams** is a promise that resolves to an object containing the query parameters (like `filters` and `sorting`).


**Example for Client Component**
```js
"use client";

import { use } from "react";
import Link from "next/link";

export default function ArticlePage({params, searchParams} : {
  params: Promise<{ articleId: string }>,
  searchParams: Promise<{ lang: "en" | "es" | "fr" }>
}) {

  const { articleId } = use(params);
  const { lang = "en" } = use(searchParmas);

  return (
    <section>
      <h1>News article {articleId}</h1>
      <p>Reading in {lang}</p>

      <section>
        <Link href={`articles/${articleId}?lang=en`}>English</Link>
        <Link href={`articles/${articleId}?lang=es`}>Spanish</Link>
        <Link href={`articles/${articleId}?lang=fr`}>French</Link>
      </section>
    </section>
  )
}
```

**Example for Server Component [link to code](/src/app/concepts/articles/[articleId]/page.tsx)**


**Note :** While page.tsx has access to both params and searchParams, layout.tsx has access to params.


### Navigation using `useRouter()` and `redirect()`:

`useRouter()` is a hook provided by Next.js for navigating in client components.

`redirect()` is a method provided by Next.js for navigating in server components.

You cannot use both in a single component. 

**Navigation in Client Component**
```js
"use client";

import { useRouter } from "next/navigation";
import { use, useEffect } from "react";

export default function ReviewPage({params}: {
    params: Promise<{productId: number}>
}) {

    const {productId} = use(params);
    const router = useRouter();

    useEffect(() => {
        if(productId > 100) {
            const timer = setTimeout(() => {
                router.push("/concepts/products");
            }, 3000);

            return () => clearTimeout(timer);
        }
    },[]);

    return (
        <section>
            <h1>this is review page with product id: {productId}</h1>
            {productId > 100 ? <p>Product Id should be less than 100. Redirecting to Product page</p>: null}
        </section>
    )
}
```

**Navigation in Server Component**
```js
import { redirect } from "next/navigation";

type productIdParams = {
  params: Promise<{ productId: number }>;
};

export default async function ProductIdPage({ params }: productIdParams) {
  const { productId } = await params;

  if(productId > 100) redirect("/concepts/products");
  
  return <section>product id: {productId}</section>;
}
```

### Problem-and-Solution
```js
import { notFound, redirect } from "next/navigation";

export default async function ReviewIdPage({params}: {
    params: Promise<{ productId: number, reviewId: string }>
}) {
    const {productId, reviewId} = await params;

    if(productId > 100) {
        setTimeout(() => {
            redirect("/concepts/products");
        }, 3000);

        notFound();

    }

    return (
        <section>
            <p>review {reviewId} for product {productId}</p>
        </section>
    )
}
```

`setTimeout` doesn't  work in server components - `redirect()` and `notFound()` are special Next.js functions and must be used synchronously.

You can't call both `redirect()` and `notFound()` - only one should be triggered; calling both is not valid.


### Template Files
Layouts only Mounts the new page content while keeping the common element intact they don't remounts shared components which leads to better performance.

This could be useful for scenarios like implementing enter or exit animations or running useEffect hooks when routes changes.

This is where template files come in handy as an alternative to layout files.

Templates are similar to layouts in that they are also UI shared between multiple pages in you app.

Whenever a user navigates between routes sharing a template, you get a completely fresh start.
  - a new templete component instance is mounted.
  - DOM elements are recreated.
  - state is cleared.
  - effects are re-synchronized.

**Templates**

Create a template by exporting a default React component from a **template.js** or **template.tsx** file.

Like layouts, templates need to accept a children prop to render the nested route segments.

By default, `template` is a Server Component, but can also be used as a Client Component through `"use client"` directive.


### loading.tsx

This file helps us create loading states that users see while waiting for content to load in a specific route segment.

The loading states appear instantly when navigating, letting users know that the application is responsive and actively loading content.

Creating `loading.tsx` file is similar to `not-found.tsx`, `layout.tsx`, `template.tsx`.

**loading.tsx benfits :**
  1. It gives users immediate feedback when they navigate somewhere new. This makes your app feel snappy and responsive, and users know their click actually did something.

  2. Next.js keeps shared layouts interactive while new content loads. User can still use things like navigation menus or sidebars even if the main content isn't ready yet.


**loading.tsx file**
```js
export default function Loading() {
    return (
        <section>
            <h1>loading...</h1>
        </section>
    )
}
```

**Showing loading.tsx file in Server Component**
```js
export default async function Products() {  
  const data = await fetch('https://api.com').then(res => res.json());
  
  return <section>product id: {data.title}</section>;
}
```

**Result** When user navigates to product page `/products`, `loading.tsx` shows while the server fetch runs and the page renders.

**You don't need to manually import or handle anything. Next.js shows it automatically if the server component is async.**

**`loading.tsx` Does NOT work automatically in Client Component**

If your page/component is a **client component** and you're fetching using `useEffect()`, then `loading.tsx` is **ignored**.

[see my code](/src/app/concepts/products/[productId]/review/page.tsx)

```js
"use client";

import { useState, useEffect } from "react";

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
  }, []);

  if(loading) return <p>loading...</p>;

  return <div>{data.title}</div>;
}
```

### Error.tsx

An **error** file allows you to handle unexpected runtime errors and display fallback UI.

It automatically wraps route segments and their nested children in a React Error Boundary.

You can create custom error UIs for specific segments using the file-system hierarchy.

It isolates errors to affected segments while keeping the rest of your app functional.

It enables you to attempt to recover from an error without requiring a full page reload.

### Props in error.js

`error`
  - An instance of `Error` object forwarded to the `error.js` Client Component.

`error.message`:
  - Error forwarded from Client Components show the original `Error` message.

  - Error forwarded from Server Components show a generic message with an identifier. This is to prevent leaking sensitive details. You can use the identifier, under `error.digest`, to match the corresponding server-side logs.

`error.digest`
  - An automatically generated hash of the error thrown. It can be used to match the corresponding error in server-side logs.

`reset`
  - The cause of an error can sometimes be temporary. In these cases, trying again might resolve the issue.

  - An error component can use the `reset()` function to prompt the user to attempt to recover from the error. When executed, the function will try to re-render the error boundary's contents. If successful, the fallback error component is replaced with the result of the re-render.

[see my code](/src/app/concepts/docs/[...slug]/error.tsx)

```js
"use client";  // Error boundaries must be Client Components

export default function Error({ error, reset } : {
  error: Error,
  reset: () => void,
}) {
  return (
    <div>
      <h2>something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### Handling errors in Nested routes

Errors always bubble up to find the closet parent error boundary.

An error.tsx handles error not just for its own folder, but for all the nested child segments below it too.

By strategically placing error.tsx files at different levels in your route folders, you can control exactly how detailed your error handling gets.

Where you put your error.tsx file make a huge difference - it determines exactly which parts of your UI get affected when things go wrong.


### Handling errors in layouts

An error.tsx file will handle errors for all its nested child segments.

There's an interesting catch with layout.tsx component in the same segment.

The error boundary won't catch errors thrown in the layout.tsx within the same segment because of how the component hierarchy works.

The layout actually sits above the error boundary in the component tree.

```js
app/
|-----layout.tsx
|-----template.tsx
|-----error.tsx
|-----loading.tsx
|-----not-found.tsx
|-----page.tsx


<Layout>
    <Template>
        <ErrorBoundary fallback={<Error />} >
            <Suspense fallback={<Loading />}>
                <ErrorBoundary fallback={<NotFound />}>
                    <Page />
                </ErrorBoundary>
            </Suspense>
        </ErrorBoundary>
    </Template>
</Layout>
```

### Handling global errors

If an error boundary can't catch errors in the layout.tsx fie from the same segment, what about errors in the root laout?

It does'nt have a parent segment - how do we handle those errors?

Next.js provides a special file called **global-error.tsx** that goes in your root app directory.

This is your last line of defense when something goes catastrophically wrong at the highest level of your app.

The **global-error.tsx** file is only shown in production mode, in developement mode you will see the default error instead.

Global error UI must defines its own `<html>` and `<body>` tags.

```js
"use client";

export default function GlobalError({error, reset} : {
  error: Error,
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```