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


### Parallel routes

Parallel routing is an advanced routing mechanism that lets us render multiple pages simultaneously within the same layout.

How to setup:
  - Parallel routes in Next.js are defined using a feature known as "slots".
  - Slots helps organize content in modular way.
  - To create slot we use the "@folder" naming convention.
  - Each defined slot automatically becomes a prop in its corresponding `layout.tsx` file.

Parallel route use cases:
  - Dashboards with multiple sections.
  - Split-view interface.
  - Multi-pane layouts.
  - Complex admin interface.

Parallel routes benfits:
  - Parallel routes are great for splitting a layout into managable slots (especially when different teams works on different parts).
  - Independent route handling.
    - Each slot in your layout, such as users, revenue, and notifications, can handle its own loading and error states.
    - This granular control is particularly useful in scenarios where different sections of the page load at varying speeds or encounter unique errors.
  - Sub-navigation
    - Each slots can essentially function as a mini-application, complete with its own navigation and state management.
    - Users can interact with each section seperately, applying filters, sorting data, or navigating through pages without affecting other parts.


```js
dashboard/
|_____@notifications/
|     |-----page.tsx
|
|_____@revenue/
|     |-----page.tsx
|
|_____@users/
|     |-----page.tsx
```


### Unmatched routes

Navigation from the UI
  - When navigating through the UI (like clicking links), Next.js keeps showing whatever was in the unmatched slots before.

Page reload
  - Next.js looks for a `default.tsx` file in each unmatched slot.
  - This file is critical as it serves as a fallback to render content when the framework cannot retrieve a slot's active state from the current URL.
  - Without the file, you'll get 404 error.


```js
dashboard/
|_____@notifications/
|     |_____archived/
|     |     |-----page.tsx
|     |-----page.tsx
|
|_____@revenue/
|     |-----page.tsx
|
|_____@users/
|     |-----page.tsx
|
|-----layout.tsx
|-----page.tsx
```

When you navigate between `notification` page and `archived` page the URL segments changes, after that if you refresh browser you will get 404 page. Because this requires a `default.tsx` file to **handle unmatched routes**.


**create default.tsx files**
```js
dashboard/
|_____@notifications/
|     |_____archived/
|     |     |-----page.tsx
|     |-----page.tsx
|
|_____@revenue/
|     |-----page.tsx
|     |-----default.tsx
|
|_____@users/
|     |-----page.tsx
|     |-----default.tsx
|
|-----layout.tsx
|-----page.tsx
|-----default.tsx
```

After creating the above like directory now try to reload after navigation to `/dashboard` then `/dashboard/archived` using `<Link>` component not directly using link in search bar.

If you type the URL segment directly in the search bar which will cause the  page to load which will show the default pages for the rest of the `slots`.



**layout.tsx inside dashboard**
```js
export default function DashboardLayout({
    children, user, revenue, notifications
}: {
    children: React.ReactNode,
    user: React.ReactNode,
    revenue: React.ReactNode,
    notifications: React.ReactNode,
}) {
    return (
        <section>
            <section>{children}</section>
            <section className="flex gap-2">
            <section className="flex flex-col gap-1">
                <article className="min-w-[200px] min-h-[200px] border border-gray-400 rounded-md">{user}</article>
                <article className="min-w-[200px] min-h-[200px] border border-gray-400 rounded-md">{revenue}</article>
            </section>
            <section>
                <article className="min-w-[200px] min-h-[400px] border border-gray-400 rounded-md">{notifications}</article>
            </section>
        </section>
        </section>
    )
}
```

layout.tsx file revieves all slots as a props inside dashboard folder.

**Note:** 
  - **Don't export custom vairables like `AuthContext` from layout files.**
  - **Next.js layout files are supposed to only export special layout-related things, like:** 
    - `generateMetadata`
    - `metadata`
    - `generateStaticParams`
    - `revalidate`, etc.
  - **When you export custom values like `AuthContext` from layout files, the Next.js compiler throws an error because it expects no extra exports outside the allowed ones.**


### Conditional routes

Imagine you want to show different content based on whether a user is logged in or not.

You might want to display a dashboard for authenticated users but show a login page for those who aren't.

Conditional routes allows us to achieve this while maintaining completely separate code on the same URL.

[conditional routes using **useContext**](/src/app/concepts/dashboard/layout.tsx)


### Intercepting routes

Intercepting routes is an advanced routing mechanism that allows you to load a route from another part of your application within the current layout.

It's particularly useful when you want to display new content while keeping your user in the same context.

Example: consider a photo gallery instead of jumping in to a dedicated photo page when someone clicks an image you can show a model with the enlarged photo in details like the photographers name and location the URL updates to match the specific photo making it sharable accessing that URL directly will show the photo's full page.

Intercepting routes conventions
  - (.) to match segments on the same level.
  - (..) to match segments one level above.
  - (..)(..) to match segments two level above.
  - (...) to match segments from the root app directory.


```js
app/
|_____feed/
|     |-----layout.tsx
|     |_____(..)photo --------------|
|     |     |_____[id]/             |
|     |           |-----page.tsx    |
|                                   |
|_____photo/  <---------------------V
|     |_____[id]/
|     |     |-----page.tsx
|
|-----layout.tsx
|-----page.tsx
```

`/feed` route contains multiple images on clicking any image segment will change from `/feed` page to `/photo/imageid` page but the actual page showm is `/feed/(..)photo/imageid` page. On refresh of page then the actual page `/photo/imageid` page is shown.

**Note : When your create intercepted route(creating folders using `(.)folderName`) you should restart the developement mode to see the working of intercepting routes, even if your try multiple times like creating intercepted routes you won't be able to see the working untill unless you restart developement mode.** 

[see my codes inside intercepted folder](/src/app/concepts/intercepted/)


### **Parallel Intercepted route (with mini project)**
```js
app/
|_____feed/
|     |-----layout.tsx
|     |-----page.tsx
|     |_____@model
|     |     |-----page.tsx 
|     |     |_____(..)photo 
|     |     |     |_____[id]/             
|     |     |     |     |-----page.tsx    
|                                   
|_____photo/
|     |_____[id]/
|     |     |-----page.tsx
|
|-----layout.tsx
|-----page.tsx
```

###  feed's layout.tsx file (`/feed` route)
```js
import Link from "next/link"
import { data } from "../data"

const getDivStyles = (color: string) => {
    const divStyles = {
        color: `${color}`,
        backgroundColor: 'azure',
        minHeight: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    }
    return divStyles;
}

export default function FeedLayout({
    children,
    modal
} : {
    children: React.ReactNode
    modal: React.ReactNode
}) {
    return (
        <section>
            <section>{children}</section>
            <section className="grid lg:grid-cols-3 gap-8 md:grid-cols-2 sm:grid-cols-1">
                {data.map((data => (
                    <Link  href={`/concepts/parallel-intercepting/photo/${data.id}`} key={data.color}>
                        <div style={getDivStyles(data.color)}>
                            {data.text}
                        </div>
                    </Link>
                )))}
            </section>
            <section>{modal}</section>
        </section>
    )
}
```

### Intercepted route inside parallel route (`/feed/(..)photo/[id].tsx` route)
```js
"use client";

import { data } from "@/app/concepts/parallel-intercepting/data";
import { useRouter } from "next/navigation";
import { use, useRef, useState } from "react";

export default function PhotoId({params} : {
    params: Promise<{id:number}>
}) {

    const {id} = use(params);
    
    const dataObj = data.find(obj => obj.id == id);

    const modelRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if(modelRef.current && !modelRef.current.contains(e.target as Node)) {
            router.back();
        } else {
            window.location.reload();
        }
    }

    return (
        <section 
            className="absolute top-0 left-0 min-w-screen min-h-screen backdrop-brightness-90 flex justify-center items-center backdrop" onClick={handleClick}
        >
            <div className="bg-white w-[400px] h-[400px] rounded-md flex justify-center items-center cursor-pointer" style={{
                backgroundColor: `${dataObj?.color}`,
                color: 'white',
                fontWeight: 'bold'
            }} ref={modelRef}>
            <p>photo {dataObj?.text}</p>
            </div>
        </section>
    )
}
```


### Actual Dynamic Photo route (redirected to this route when refreshed intercepted route) `/feed/photo/[id]/page.tsx`
```js
import { data } from "../../data";

export default async function PhotoId({params} : {
    params: Promise<{id:number}>
}) {

    const {id} = await params;
    const dataObj = data.find(obj => obj.id == id);

    return (
        <section className="flex justify-center items-center">
            <section className="min-h-[50vh] min-w-1/2 flex justify-center items-center rounded-md text-2xl" style={{
                backgroundColor: `${dataObj?.color}`,
                color: 'white',
                fontWeight: 'bold'
            }}>
                <p>{dataObj?.text}</p>
            </section>
        </section>
    )
}
```


### Route Handlers

The app router lets you create custom request handlers for your routes using a feature called **Route Handlers**.

Unlike page routes, which give HTML content, Route Handlers let us build RESTful endpoints with complete control over the response.

Think of it like building a Node + Express app, but there's no need to setup and configure a seperate server.

Route Handlers are great when making external API requests as well. For example, if you're building an app that needs to talk to third-party services.

Route Handlers run server-side, our sensitive info like private keys stays secure and never reaches the browser.

Route Handlers are the equivalent of API routes in Page router.

Next.js supports GET, POST, PUT, PATCH, DELETE, HEAD and OPTIONS.

If an unsupported method is called, Next.js will reture a 405 Method Not allowed response.

**Note: If a directory has two files `page.tsx` and `route.ts` and the `route.ts` file take over the `page.tsx` file. When you try to build your application you will get error `Error: you cannot use a file named 'route.ts' or 'route.js' in a route segment that also uses a file such as 'page.tsx'`**

```js
// only works in developement mode
app/
|_____products/
|     |-----page.tsx   // it will be ignored
|     |-----route.ts   // it will be considered

// try this first and then see the output.
```

### Example for `/product` route

```js
export async function GET() {
  return new Response("response from Product");
}
```


### GET Request Route Handler
```js
import { comments } from "./data";

export async function GET() {
  return Response.json(comments);
}
```

### POST Request Handler
```js
import { NextRequest } from "next/server";
import { comments } from "./data";

export async function POST(request: NextRequest) {
    const res = await request.json();

    const newComments = {
        id: comments.length+1,
        comment: res.comment
    }
    comments.push(newComments);

    return Response.json(comments);
}
```

send object with comment as property to body in POST request.

### Dynamic Route Handler

Dynamic route handler accepts two objects: request object and context object. Context object is the dynamic value wrapped in promise object.

```js
app/
|_____api/
|     |_____comments
|     |     |-----data.ts
|     |     |-----route.ts
|     |     |_____[id]/           // dynamic route
|     |     |     |-----route.ts


route: `/api/comments/1`
```

```js
import { comments } from "../data";

export async function GET(request: Request, {params}: { params: Promise<{id: string}>}) {
    const id = (await params).id;
    const result = comments.find(comment => comment.id == +id);

    return Response.json(result);
}
```


### PATCH Request

PATCH request let us make partical modification to a resource.

```js
export async function PATCH(request: Request, {params}: {params: Promise<{id: string}>}) {

    const { id } = await params;
    const body = await request.json();
    const { comment } = body; 

    const index = comments.findIndex(comment => comment.id == +id);
    comments[index].comment = comment;

    return Response.json(comments[index]);
}
```


### DELETE Request

```js
export async function DELETE(request: Request, {params} : {
    params: Promise<{id: string}>
}) {

    const { id } = await params;
    const index = comments.findIndex(comment => comment.id == +id);
    const deletedComment = comments[index];
    comments.splice(index, 1);

    return Response.json(deletedComment);
}
```


### URL Query Parameters

```js
import { NextRequest } from "next/server";
import { comments } from "./data";

export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  const filteredComments = query ? comments.filter(obj => obj.comment.includes(query)) : comments;
    
  return Response.json(filteredComments);
}
```
Note: works if `request: NextRequest` type.


### Headers in Route Handlers

HTTP headers represent the metadata associated with an API request and response.

**Request Headers**

- These are sent by the client, such as web browser, to the server. They contain essential info about the request, which helps the server understand and process it correctly.

- `User-Agent` which identifies the browser and operating system to the server.

- `Accept` which indicates the content types like text, video, or image formats that the client can process.

- `Authorization` header used by the client to authenticate itself to the server.

**Response Headers**

These are sent back from the server to the client. They provide info about the server and the data being sent in the response.

- `Content-Type` header which indicates the media type of the response. It tells the client what the data type of the returned content is, such as text/html for HTML documents, application/json for the JSON data etc.

### Headers from Client-side

```js
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
    const headersList = await headers();
    console.log(headersList.get("Authorization"));

    return new Response("Profile API data. ");
}
```
[**see alternate way of accessing headers**](/src/app/api/profile/route.ts)


Headers returned from the headers functions are readonly.

To set new headers you will need to return new response with your custom headers.

### Returning Headers from Server-side

```js
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
    const headersList = await headers();
    console.log(headersList.get("Authorization"));

    return new Response("<h1>Profile API data.</h1>", {
      headers: {
        "Content-Type": "text/html"
      }
    });
}
```


### Cookies in Route Handlers

Cookies are small piece of data that a server sends to a user's web browser.

The browser can store the cookies and send them back to the same server with future requests.

Cookies serve 3 main purposes:

  - Managing sessions (like user logins and shopping carts).
  - Handling personalization (such as user preferences and themes).
  - Tracking (like recording and analyzing user behaviour).

```js
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    // first approach
    const theme = request.cookies.get("theme");
    console.log(theme);
    
    // second approach
    const cookieStore = await cookies();
    cookieStore.set("resultPercentage", "70");
    console.log(cookieStore.get("resultPercentage"));

    return new Response("<h1>Profile API data.</h1>", {
        headers: {
            "Content-Type": "text/html",
            "Set-Cookie": "theme=dark",
        }
    });
}
```


### Redirecting

```js
import { redirect } from "next/navigation"

export default function ArticlePage() {

    redirect("/concepts/articles/breaking-news-598?lang=en");

    return (
        <div>welcome to Article page</div>
    )
}
```

When URL hit this page it will automatically redirect page to the URL passed into this `redirect()`


### Caching

Route handlers are not cached by default but you can opt into caching when using the GET method.

Caching only works with GET method.

Other HTTP methods like POST, PUT, or DELETE are never cached.

If you're using dynamic function like headers() and cookies(), or working with the request object in you GET method, caching won't be applied.

```js
export const dynamic = "force-static"; // this will make the page static
export const revalidate = 10; // after 10 seconds the new data is showed

export async function GET() {
  return Response.json({ time: new Date().toLocaleTimeString() });
}
```

In developement mode the `force-static` does'nt work, you have to go to production mode to see the working of static page which reloads after 10 seconds.


### Middleware

Middleware in Next.js is a powerful feature that lets you intercept and control the flow requests and responses throughout your application.

It does this at a global level, significantly enhancing features like redirects, URL rewrites, authentication, headers, cookies and more.

Middleware runs before cached content and routes are matched.

Middleware lets you specify paths where it should be active: 
  - Custom matcher config ([see example](/src/middleware.ts))
  - Conditional statements


### Matcher in Middleware

`matcher` allows you to fileter Middleware to run on specific paths.

```js
export const config = {
  matcher: '/about',     // for single path
}

or 

export const config = {
  matcher: [            // for multiple path
    "/about",
    "/contact"
  ]
};
```

### Conditional statements Example

```js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    if(request.nextUrl.pathname == "/concepts/docs") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}
```

### Rewrite URL

```js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if(request.nextUrl.pathname == "/concepts/secret") {
    return NextResponse.rewrite(new URL("/concepts/docs", request.url));
  }

  return NextResponse.next();
}
```

Here the URL stays same but the page changes. If `/concepts/secret` is enter in the searchbar then the URL stays same but the page changes to `/concepts/docs`.


### Cookies and Headers in Middleware

```js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const themePreference = request.cookies.get("theme");
  if(!themePreference) {
    response.cookies.set("theme", "dark");
  }

  NextResponse.headers.set("custom-header", "custom-value");

  return response;
}
``` 


### Rendering

Rendering is the process of transforming the component code you write into user interfaces that uses can see and interact with.

In Next.js, the tricky part to building a performant application is figuring out when and where this transformation should happen.

### Client-side Rendering

This whole approach - where your borwser (the client) transform React components into what you see on screen - that's what we call client-side rendering (CSR).

CSR became super popular for SPAs, and everyone was using it.

It wasn't long before developers began noticing some inherent drawbacks to this approach.

### Drawbacks for CSR

SEO
  - When search engines crawl your site, they're mainly looking at HTML content, But with CSR, your initial HTML is basically just an empty `div` - not great for search engines trying to figure out what your page is about.

  - When you have a lot of nested components making API calls, the meaningful content might load too slowly for search engines to even catch it.

Performance
  - Your browser (the client) has to do everything: fetch data, build the UI, make everything interactive, that's a lot of work!

  - User often end up staring at a blank screen or a loading spinner while all this happens.

  - Every time you add a new feature to your app, that javascript bundle gets bigger, making user wait even longer.

  - This is especially frustrating for people with slower internet connections.


### Server-side Rendering (Solution to CSR drawbacks)

Search engines can now easily index the server-rendered content, solving our SEO problem.

User see actual HTML content right away instead of staring at a blank screen or loading spinner.


### Hydration

When initiall page requested by the browser, the Next.js returns HTML + JS reference for better SEO and show non-interactive UI, then returns the JavaScript code at the next request.

During hydration, React takes control in the browser and reconstructs the component tree in memory, using the server-rendered HTML as a blueprint.

It carefully maps out where all the interactive elements should go, then hooks up the JavaScript logic.

This involves initializing application state, adding click and mouseover handlers and setting up all the dynamic features needed for a fully interactive user experience.


### Server-side Solution

1. Static Site Generation (SSG)
2. Server-Side Rendering (SSR)

SSG happens during build time when you deploy your application to the server. This results in pages that are already rendered and ready to serve. It's perfect for content that stays relatively stable, like blog posts.

SSR, on the other hand, renders pages on-demand when users request them. It's ideal for personalized content like social media feeds where the HTML changes based on who's logged in.

Server-side Rendering (SSR) was a significant improvement over Client-Side Rendering (CSR), providing faster initial page loads and better SEO.


### Drawbacks of SSR

1. **You have to fetch everything before you can show anything**
  - Components cannot start rendering and then pause or "wait" while data is still being loaded.

  - If a component needs to fetch data from a database or another source (like an API), this fetching must be completed before the server can begin rendering the page.

  - This can delay the server's response time to the browser, as the server must finish collecting all necessary data before any part of the page can be sent to the client.

2. **You have to load everything before you can hydrate anything**
  - For successfull hydration, where React adds interactivity to the server-rendered HTML, the component tree in the browser must exactly match the server-generated component tree.

  - This means that all the JavaScript for the components must be loaded on the client before you can start hydrating any of them.

3. **You have to hydrate everything before you can interact with anything**

  - React Hydrates the component tree in a single pass, meaning once it starts hydrating, it won't stop untill it's finished with the entire tree.

  - As a consequence, all components must be hydrated before you can interact with any of them.


### Drawbacks of SSR - all or nothing waterfall

1. We can't start rendering HTML untill all data is fetched on the server.
2. We need to wait for all JavaScript to load on the client before hydration can begin.
3. Every component needs to be hydrated before any of them become interactive.

At once, create an "all or nothing" waterfall problem that spans from the server to the client, where each issue must be resolved before moving to the next one.

This becomes really inefficient when some parts of your app are slower than others, as is often the case in real-world apps.


### **Suspense SSR Architecture**

Use the `<Suspense>` component to unlock two major SSR features:
  1. HTML streaming on the server.
  2. Selective hydration on the client.


### HTML streaming on the server

**HTML streaming solves our first problem:**
  - You don't have to fetch everything before you can show anything.

  - If a particular section is slow and could potentially delay the initial HTML, no problem!.

  - It can be seamlessly integrated into the stream later when it's ready.


### The other hurdle

- Even with faster HTML delivery, we can't start hydrating untill we've loaded all the JavaScript for the main section.

- If that's a big chunk of code, we're still keeping users waiting from being able to interact with the page.

### Code Splitting

- It lets you tell you bundler, "These parts of the code aren't urgent - split them into seperate scripts".

- Using `React.lazy()` for code splitting seperates you main section's code from the core javascript bundle.

- The browser can download React and most of your app's code independently, without getting stuck waiting for that main section's code.


### Selective Hydration on the Client

- By wrapping you main section in a `<Suspense>` component, you're not just enabling streaming but also telling React it's okay to hydrate other parts of the page before everything's ready.

- This is what we call **selective hydration**.

- It allows for the hydration of parts of the page as they become available, even before the rest of the HTML and JavaScript code are fully downloaded.


```js
import { lazy } from 'react';
const MainContent = lazy(() => import('./MainContent.js'));

<Layout>
  <Header>
    <SideNav>
      <Suspense fallback={<Spinner />}>
        <MainContent>
      </Suspense>
    </SideNav>
  </Header>
</Layout>
```

Because of selective hydration, a heavy chunk of JavaScript won't hold up the rest of your page from becoming interactive.

**Selective Hydration also solves our third problem:**

The necessity to "hydrate everything to interact with anything".

React starts hydrating as soon as it can, which means users can interact with things like the header and side-navigation without waiting for the main content.

This process is managed automatically by React.

In scenarios where multiple components are awaiting hydration, React prioritizes hydration based on user interactions.


### Drawbacks of Suspense SSR

First, even though we're streaming JavaScript code to the browser bit by bit, eventually users still end up downloading the entire code for a webpage.

As we keep adding features to our apps, the code keeps growing.

This leads to an important question: **Do users really need to download so much data?**

Right now, every React Component gets hydrated on the client side, whether it need interactivity or not.

This means we're using up resources and slowing down load times and time to interactivity by hydrating components that might just be static content.

This leads to another question: **Should all components be hydrated, even those that don't need interactivity?**

Third, even though servers are way better at handling heavy processing, we're still making user's devices do bulk of the JavaScript work.

This can really slow things down, espically on less powerful devices.

This leads to another important question: **Shouldn't we be leveraging our servers more?**


### React Server Components

The Evolution or React: CSR -> SSR -> Suspense for SSR.

Suspense for SSR brought us closer to a seamless rendering experience

**Challanges :**
  - Larger bundle sized causing excessive downloads for users.

  - Unnecessary bydration delaying interactivity.

  - Heavy client-side processing leading to poorer performance.


React Server Components (RSC) represent a new architecture designed by the React team.

This approach leverages the strengths of both server and client environments to optimize efficiency, load times, and interactivity.

The architecture introduces a dual-component model: 
  - Client Components
  - Server Components

This distinction is based not on the component's functionality but rather on their execution environment and the specific systems they are designed to interact with.

### Client Components
  - Client Components are typically rendered on the client-side (CSR) but, they can also be rendered to HTML on the server (SSR), allowing users to immediately see the page's HTML content rather than a blank screen.

  - "client component" can render on the server(it is best understood as an optimization strategy).

  - Client Components primarily opeate on the client but can (and should) also run once on the server for better performance.

  - Client Components have full access to the client environment, such as the browser, allowing then to use state, effect, and event listeners for handling interactivity.

  - They can also access browser-exclusive APIs like geolocation or localStorage, allowing you to build UI for specific use cases.

  - In fact, the term "Client Component" doesn't signify anything new; it simply helps differentiate these components from the newly introduced server components.

  - Server Components represent a new type of React component specifically designed to operate exclusively on the server.

  - And unlike client components, their code stays on the server and is never downloaded the the client.


### Benfits of Server Components

1. **Smaller bundle sizes**
    - Since Server Components stays on the server, all their dependencies stay there too.

    - This is fantastic for users with slower connections or less powerful devices since they don't need to download, parse, and execute that JavaScript.

    - Plus, there's no hydration step, making your app load and become interactive faster.

2. **Direct access to server-side resources**
    - Server Components can talk directly to databases and file systems, making data fetching super efficient without any client side processing.

    - They use the server's power and proximity to data sources to manage compute-intensive rendering tasks.

3. **Enhanced security**
    - Since Server Components run only on the server, sensitive data and logic - like API keys and tokens - never leave the server.

4. **Improved data fetching**
    - Server Components allow you to move data fetching to the server, closer to your data source.

    - This can improve performance by reducing time it takes to fetch data needed for rendering, and the number of request the client need to make.

5. **Caching**
    - When you render on the server, you can cache the results and reuse them for different users and requests.

    - This means better performance and lower costs since you're not re-rendering and re-fetching data all the time.

6. **Faster initial page load and First Contentful Paint**
    - By generating HTML  on the server, users see your content immediately - no waiting for JavaScript to download and execute.

7. **Improved SEO**
    - Search engine bots can easily read the server-rendered HTML, making your pages moe indexable.

8. **Efficient streaming**
    - Server Components can split the rendering process into chunks that stream to the client as they're ready.

    - This means users start seeing content faster instead of waiting for the entire page to render on the server.

### RSC Contd.

Server Components handle data fetching and static rendering, while Client Components take care of rendering the interactive elements.

The beauty of this setup is that you get the best of both server and client rendering while using a single language, framework, and set of APIs.


### RSC key takeaways

React Server Components offer a new approach to building React apps by seperating components into two: Server Components and Client Components.

Server Components run exclusively on the server - they fetch data and prepare content without sending code to the browser.

This makes your app faster because user download less code.

However, they can't handle any interactions.

Client Components, on the other hand, run in the browser and manage all the interactive parts like clicks and typing.

They can also get an initial server render for faster page load.

**Note :** The App Router in Next.js is built entirely on the RSC architecture.


### RSC + Next.js

Every component in a Next.js app defaults to being a server component, unless explicitly specified.

Running components on the server brings serveral advantages: Zero-bundle size, direct access to server-side resources, improved security, and better SEO.

Server Components can't interact with browser APIs or handle user interactions.

To create client components, add the `"use client"` directive at the top of the file.

Server Components are rendered exclusively on the server.

Client Components are rendered once on the server and then on the client.

**Server Component Example**
```js
export default function ServerPage() {
    console.log("this is server component");

    return (
        <section>
            <p>Date: {new Date().toLocaleDateString()}</p>
        </section>
    )
}
```

**Client Component Example**
```js
"use client";

import { useState } from 'react';

export default function ClientPage() {
    const [input, setInput] = useState("");

    return (
        <section>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <p>Input is : {input}</p>
        </section>
    )
}
```


### Server Rendering Strategies
  - Static rendering
  - Dynamic rendering
  - Streaming


### Static Rendering

Static rendering is a server rendering starategy where we generate HTML pages when building our application.

Think of it as preparing all your content in advance - before any user visits your site.

Once built, these pages can be cached by CDNs and served instantly to users.

With this approach, the same pre-rendered page can be shared among different users, giving your app a significant performance boost.

Static rendering perfect for things like blog posts, e-commerce product listing, documentation, and marketing pages.


### How to statically render?

Static rendering is the default strategy in the app router.

All routes are automatically prepared at build time without any additional setup.

### Production server vs Dev server
  - In production, we create on optimized build and deploy it - no on-the-fly changes after deployment.

  - A developement server, on the other hand, focuses on the developer experience, we need to see our chages immediately in the browser without rebuilding the app every time.

  - In production, pages are pre-rendered once during the build.

  - In development, pages are pre-rendered on every request.

### Prefetching

  - Prefetching is a technique that preloads routes in the background as their links become visible.

  - For static routes like ours, Next.js automatically prefetches and caches the whole route.

  - When our home page loads, Next.js is already prefetching `about` and `dashboard` route for instant navigation.

### Static rendering summary
  - Static rendering is a strategy where the HTML is generated at build time.

  - Along with the HTML, RSC payloads for components and JavaScript chunks for client-side hydration are created.

  - Direct route visits serve HTML files.

  - Client-side navigation uses RSC payloads and JavaScript chunks without additional server requests.

  - Static rendering is great for performance, especially in blogs, documentation, and marketing pages.


### Dynamic Rendering

Dynamic rendering is a server rendering strategy where route are rendered uniquely for each user when they make a request. 

It is useful when you need to show personalized data or info that's only available at request time (and not ahead of time during prerendering) - things like cookies or URL search parameters.

News websites, personalized shopping pages, and social media feeds are some examples where dynamic rendering is beneficial.

### How to dynamically render

Next.js automatically switches to dynamic rendering for an entire route when it detects what we call a "dynamic function" or "dynamic API".

In Next.js, these dynamic functions are:
  - cookies()
  - headers()
  - connection()
  - draftMode()
  - searchParama prop
  - after()

Using any of these automatically opts your entire route into dynamic rendering at request time.

You don't have to stress about choosing between static and dynamic rendering.

Next.js automatically selects the optimal rendering strategy for each route based on the features and APIs you're using.

If you want to force a route to be dynamically rendered, you can use the `export const dynamic ='force-dynamic'` config at the top of your page.


### generateStaticParams()

It is a function that
  - works alongside dynamic route segments
  - to generate static routes during build time
  - instead of on demand at request time
  - giving us a nice performance boost


![static-dynamic-build-image](/public/dynamic-demo-1.png)

![static-dynamic-diff-image](/public/static-dynamic.png)

The `concept/books/page.tsx` do not have any dynamic data so it is served as static route.

As the `/concepts/books/[bookId]/page.tsx` is dynamic route so it is build to server as a dynamic content.

```js
export default async function Book({params}: {params: Promise<{bookId: string}>}) {

    const bookId = (await params).bookId;   // this is dynamic value

    return (
        <>
            <h1>Book {bookId}</h1>
            <p>current time is {new Date().toLocaleTimeString()}</p>  
        </>
    )
}
```

The time `new Date().toLocaleTimeString()` in the above code will update on refresh or every render.

### After using generateStaticParams()

```js
export async function generateStaticParams() {
    return [{bookId: "1"}, {bookId: "2"}, {bookId: "3"}];
}

export default async function Book({params}: {params: Promise<{bookId: string}>}) {

    const bookId = (await params).bookId;

    return (
        <>
            <h1>Book {bookId}</h1>
            <p>current time is {new Date().toLocaleTimeString()}</p>
        </>
    )
}
```

The time `new Date().toLocaleTimeString()` in the above code will update only on URL segment change (i.e, dynamic value change) but not on refresh.

Time is captured at the build time for the above 3 `bookId` dynamic values from the `generateStaticParams()`.

See the below image, where time is same for the 3 routes highlighted in the image as those routes are static routes.

![build-folders-after-using-generateStaticParams](/public/generate-static-params-1.png)

![build-folders-after-using-generateStaticParams](/public/static-dynamic-build.png)

### For Multiple dynamic route segments

Suppose we have a product catalog with categories and products - `/products/[category]/[product]/page.tsx`.

```js
export async function generateStaticParams() {
  return [
    { category: 'electronics', product: 'smartphone' },
    { category: 'electronics', product: 'laptop' },
    { category: 'books', product: 'science-fiction' },
    { category: 'books', product: 'biography' }
  ];
}
```

### dynamicParams

Control what happens when a dynamic segment is visited that was not generated with `generateStaticParams()`.

**true** - Next.js will statically render pages on demand for any dynamic segments not included in `generateStaticParams()`.

**false** - Next.js will return a 404 error for any dynamic segments not included in out pre-rendered list.

```js
export const dynamicParams = false;

export async function generateStaticParams() {
    return [{bookId: "1"}, {bookId: "2"}, {bookId: "3"}];
}

export default async function Book({params}: {params: Promise<{bookId: string}>}) {

    const bookId = (await params).bookId;

    return (
        <>
            <h1>Book {bookId}</h1>
            <p>current time is {new Date().toLocaleTimeString()}</p>
        </>
    )
}
```

### When to use what>

**true:**
  - If you're building an e-commerce site, you'll probably want to keep `dynamicParams` set to `true`.

  - This way, you can pre-render your most popular product pages for better performance, but still allow access to all your other products - they'll just be rendered on demand.

**false:**
  - If you're working with something like a blog where you have a smaller, more fixed number of pages, you can pre-render all of them and set `dynamicParams` to `false`.

  - If someone tries to access a blog post that doesn't exist, they'll get a clean 404 error instead of waiting for a page that will never exist.


### Streaming

Streaming is a strategy that allows for progressive UI rendering from the server.

Work is broken down into smaller chunks and streamed to the client as soon as they're ready.

This means users can see part of the page right away, without waiting for  everything to load.

It's particularly powerful for improving initial page load times and handling UI elements that depends on slower data fetches, which would normally hold up the entire route.


### Streaming strategy using `<Suspense>`

```js
import { Suspense } from "react";
import Product from "./Product";
import Reviews from "./Reviews";

export default function StreamingPage() {
    return (
        <section>
            <h1>Streaming page</h1>
            <Suspense fallback={<p>Please wait product is loading...</p>}>
                <Product />
            </Suspense>
            <Suspense fallback={<p>reviews are loading...</p>}>
                <Reviews />
            </Suspense>
        </section>
    )
}
```


### Server and Client Composition Patterns

**Server Components**
  - fetching data.
  - accessing backend resources directly.
  - keeping sensitive info (like access tokens and API keys) secure on the server.
  - handling large dependencies server-side - which means less JavaScript for your user to download.

**Client Components**
  - adding interactivity.
  - handling event listeners (like onClick(), onChange(), etc.).
  - managing state and lifecycle effects (using hooks like useState(), useEffect(), etc.).
  - working with browser-specific APIs.
  - Implementing custom hooks.
  - Using React class components.


### Context Providers

Context providers typically live near the root of an application to share global state and logic.

For example, your application's theme.

However, React context isn't supported in Server Components.

If you try to create a context at your app's root, you'll run into an error.

The solution is to create your context and render its provider inside a dedicated Client Component.

### Server-only code

**server-only package:** Throws a build-time error if someone accidentally imports server code into a client component.  


### Client-only code

To prevent unintended server side usage of client side code, we can use a package called **client-only**


**Note:**

  - **Any component nested inside a client component automatically becomes a client component too, since client component renders after server component you can't import a server component directly into a client component**.

  - **Instead of nesting server component pass it into a client component as a prop**. 


### Data fetching in App Router

The App router is build on React Server Component (RSC) architecture which gives us the flexibility to fetch data using either server component or client components.

It's usually preferable to use server components for data operations because:
  - You can directly communicate with your databases and file systems on the server side.

  - You get better performancee since you're closer to your data source.

  - Your client-side bundle stays lean because the heavy lifting happens server-side.

  - Your sensitive operations and API keys remain secure on teh servers.

### Client side Data fetching

```js
"use client";

import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export default function UserClient() {
    const [users, setUsers] = useState<User []>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
                if(!response.ok) throw new Error(`Failed to fetch users`);
                const data = await response.json();
                setUsers(data);
            } catch(err) {
                if(err instanceof Error) {
                    setError(err.message);
                } else {
                    setError(`An unknown error occurred`);
                }
            } finally {
                setLoading(false);
            }
        }
        fetchUsers();
    }, []);

    if(loading) return <section>Loading please wait...</section>

    if(error) return <section>{error}</section>

    return (
        <>
            <ul>
                {users.map(user => (
                    <li 
                        key={user.id}
                        className="p-4 bg-white shadow-md rounded-lg text-gray-700"
                    >
                        <p className="font-bold">{user.name}</p>
                        <section>
                            <p>Username: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                        </section>
                    </li>
                ))}
            </ul>
        </>
    )

}
```

### Fetching data with Server Components

The RSC architecture supports `async` and `await` keywords in Server Components.

This means we can write our data fetching code just like regular JavaScript, using async function coupled with the await keyword.

[**see example**](/src/app/concepts/data-fetching/user-server/page.tsx)


### Data Fetching Patterns

**Sequential**: Request in a component tree are dependent on each other. This can lead to longer loading times.

**Parallel** Request in a route are eagerly initiated and will load data at the same time. This reduces the totat time to load data.


### Sequential Fetching

```js
import Author from "./Author";

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export default async function ParallelFetching() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    let posts = await response.json();

    posts = posts.filter((post: Post) => post.id < 10);

    return (
        <section>
            <ul className="flex flex-col gap-3 mb-2 mt-2">
                {posts.map((post: Post) => {
                    return <li key={post.id} className="border border-black rounded-lg p-2 flex flex-col gap-3">
                        <section>
                        <p className="font-bold">{post.title}</p>
                        <p>{post.body}</p>
                        </section>
                        <Author id={post.id} />
                    </li>
                })}
            </ul>
        </section>
    )
}
```

```js
export default async function Author({id}: {id: number}) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await response.json();

    return (
        <p><b className="text-sm">{user.name}</b></p>
    )
}
```

### Parallel Fetching

```js
type UserPosts = {
  id: string;
  name: string;
  title: string;
  body: string;
}

async function getUserPosts(userId: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  return response.json();
}
async function getUserAlbums(userId: string) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
  return response.json();
}

export default async function UserProfile({ params }: { params: Promise<{id: string}>}) {
  const { id } = await params;

  const postsData = getUserPosts(id);
  const albumsData = getUserAlbums(id);

  const [posts, albums] = await Pomise.all([postsData, albumsData]);

}
```