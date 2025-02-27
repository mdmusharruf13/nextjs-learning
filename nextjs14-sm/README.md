This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# NextJS 14

By default all the components are server components in Next.js.

In order to make a component as client component use "use client" directive at the top of the file.

### Routing

Next.js follows folder based routing.
Each folder must contain one page.jsx or .tsx.
page.js servers as a UI for that route.

```
app:
  about:
    -page.jsx
  contact:
    -page.jsx
  projects:
    mini-projects:
        -page.jsx
    major-projects:
        -page.jsx
    -page.jsx
```

**All Possible Paths:**

```
website-url/
website-url/about
website-url/contact
website-url/projects
website-url/projects/mini-projects
website-url/projects/major-projects
```

### Dynamic routes - []

Dynamic routes in Next.js allow you to create flexible URLs that can handle different values dynamically, making it possible to _serve multiple pages with a single file_. Instead of hardcoding every route, you can define **dynamic segments** using square brackets (**[]**) in the **pages** directory.

```
Directory path:
pages/product/[singleProduct]/page.js

URL path:
pages/product/123
pages/product/one
pages/product/su-57
```

Those dynamic values can be accessed using **params** props.
Since the **params** prop is a promise. you must use async/await or React's **use()** function to access the value.

### catch-all route - [...paths]

Dynamic routes can be extended to **catch-all** subsequent routes by adding three dots followed by any name [...folder].
For example, _app/project/[...slug]/page.js_ will match \_/project/mini, but also _/project/mini/first_, _/project/mini/second/about_, and so on.

| Route                         | Example URL    | params                  |
| ----------------------------- | -------------- | ----------------------- |
| app/project/[...slug]/page.js | /project/a     | { slug: ['a'] }         |
| app/project/[...slug]/page.js | /project/a/b   | { slug: ['a','b'] }     |
| app/project/[...slug]/page.js | /project/a/b/c | { slug: ['a','b','c'] } |

### Navigation

In client component you can use **useRouter()** hook to navigate.

```js
"use client";
import { useRouter } from "next/navigation";

const router = useRouter();

<button onClick={() => router.push("/contact")}>go to contact section</button>;
```

In server component you can use **redirect()** method to navigate.

```js
import { redirect } from "next/navigation";

const redirectUser = true;

if (redirectUser) redirect("/projects");
```

### Link Component - navigation

Link component can also be used for navigation.

```js
import Link from "next/Link";

<Link href={"/projects"}>go yo project</Link>;
```

### Client side URL

**useSearchParams()**: A Clinet Component hook that lets you read the current URL's search parameters.

```js
import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();

path: /project/1?name=mini

console.log(searchParams.get("name")); // mini
```

**usePathname()**: A Client Component hook that lets you read current URL's pathname.

```js
import { usePathname } from "next/navigation";

const pathName = usePathname();

path: /project/mini-project

console.log(pathName); // /project/mini-project
```

### Accessing URL Parameters - params

You can access the parameters of a dynamic route using **params** at client component.
**Note**: From Next.js 14 onwards **params** is a promise.

**first way**: using useState() and useEffect()

```js
"use client";

import { useState, useEffect } from "react";

export default function IDPage({params}) {
  const [paramsState, setParamsState] = useState(null);

  useEffect(function getParams() {
    params.then(val => setParamsState(val));
  }, []);

  return <section>ID: {paramsState ? paramsState.id ? "loading..."}</section>
}

```

**second way**: using React.use();

```js
"use client";

import { use } from "react";

export default function IDPage({ params }) {
  const paramsData = use(params);

  return <section>ID: {paramsState.id}</section>;
}
```

### Accessing Dynamic Route Parameter in Server Component

In Server Component params object is a promise you should use async/await to resolve that promsie object before using it. Server Components can be async but not Client Component.

```js
export default async function ProjectIDPage({ params }) {
  const paramsData = await params;

  return <section>project id: {paramsData.project_id}</section>;
}
```

### useSearchParams in Server Component

Similar to **useSearchParams()** there is **searchParams** prop in server component, but it is a promise object.

```js
export default async function ProjectIDPage({ searchParams }) {

    const resolvedSearchParams = await searchParams;

    /project/mini-project/55?name=mush&lang=js

    console.log(resolvedSearchParams); // {name: 'mush', lang: 'js'}
}
```

## loading.js

- The **loading.js** file is a special React Suspense-based loader in Next.js that automatically show a loading UI while a page is being fetched or rendered.
- **loading.js** only works if your page has dynamic behaviour (eg., fetching data, waiting for a response).
- If a page is fully static, Next.js won't show **loading.js** because there's nothing to 'load'.
- By default, this file is a Server Component - but can also be used as a Client Component through the "use client" directive.
- **loading.js** only works with Server Compoenent and not client components, if you are using "use client", wrap the component in Suspense instead.

If you want you can add artificial delay to see the loader.

```js
export default async function ContactPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2s delay
  return <h1>Contact page</h1>;
}
```

## not-found.js

Next.js Uses Global **_not-found.js_** for custom not-found pages.

By default, Next.js only triggers **_not-found.js_** inside a folder if a route in that folder calls **_notFound()_** explicitly.

- **option 1: Use a Catch-All Route ([...slug])**:
  This automatically catches all invalid subpaths inside each folder and trigger **_not-found.js_** of that particular folder but not global **_not-found.js_**.
  ```js
  app/
  |--contact/
  |     |--[...slug]/          <-- catches all subpaths after contact
  |     |     |--page.js       <-- calls `notFound()`
  |     |--not-found.js        <-- custom 404 for `/contact/`
  ```
- **option 2: Manually call _notFound()_ in page.js**
  If you don't want a to catch-all route, you can manually handle the 404 inside particular directory.

  ```js
  import { notFound } from "next/navigation";

  export default function CatchAllPage() {
    notFound(); // triggers `app/contact/not-found.js`
  }
  ```

  Now, visiting _/contact/user_ will trigger _app/contact/not-found.js_.

**Note**: If you want **not-found.js** to work inside every folder, add a catch-all route ([...slug]) in each folder. This ensures that every folder uses its own **not-found.js** automatically.

## Server Side Data Fetching

1. **Basic Server-Side Fetching (Default in _app/_)**:  
    All components in the _app/_ directory are **Server Components by default**, meaning you can use **fetch()** without async functions like **getServreSideProps** (_used in pages/_).

   **Note**: this is just demo there is lot more things to do in the below example, see my example code [check here](/src/app/server-data-fetch/page.js).

   ```js
   export default async function UserPage() {
   const response = await fetch('https://dummyjson.com/users');
   const users = await response.json();

   return (
     <section>
       <h1>User List</h1>
       <u1>
         {users.map(user => <li key={user.id}>{user.firstName}</li>)}
       </ul>
     </section>
   )
   }
   ```

   **How it works:**

   - **fetch()** runs only on the server.
   - The **entire HTML** is generated **before** sending it to the client.
   - **No client-side JavaScript needed -> better performance & SEO**.

2. **Fetching with _cache_ & _no-cache_ (Control Caching)**:

   By default, **fetch() caches responses to improve performance**.  
   But if you want **fresh data** on every request, use **{ cache: "no-store" }**.  
   **Without cache: "no-store", Next.js may serve old data from cache**.

   ```js
   const response = await fetch("api", {
     cache: "no-store", // No caching (fetch fresh data every time).
   });
   const data = await response.json();
   ```

3. **Fetching with Revalidation (revalidate)**:
   If your API data **doesn't changes frequently**, but you still want to update it **every x seconds**, use **revalidate**.

   ```js
   const response = await fetch(api, {
     next: { revalidate: 30 }, // cache for 30 seconds, then fetch fresh data
   });
   const data = await response.json();
   ```

   **How it works**:

   - Data is **cached** for **30 seconds**.
   - After 30 seconds, the next request **fetches fresh data**.

4. **Server-Side Fetching with Database (MongoDB Example)**:
   To fetch data from a **database**, we connect to the DB inside the **server component**.

   ```js
   const db = await connectDB();
   const users = await db.collection("users").find().toArray();
   ```

   **Note**: **This is fully server-side** and never exposes database credentials to the client.

**When NOT to Use Server-Side Fetching?**

- If data needs to be updated in real-time (use Client Components + _useEffect_ instead).
- If data is user-specific (fetch it in a Client Compoennt with _useEffect_).
- If the page is a Client Component ("use client") - use Susupense or API calls instead.

## Client-Side Data Fetching in Next.js (_app/_ Directory):

Client-side data fetching in Next.js means **fetching data on the user's browser after the page loads**, using **React hooks like _useEffect_ or _useSWR_**.

1. **Basic Fetching Using _useEffect_ and _useState_**.
   This is the most common way to fetch data in **client component**.

   ```js
   "use client"; // Important: This must be at the top
   import { useEffect, useState } from "react";

   export default function UserPage() {
     const [users, setUsers] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       fetch("https://dummyjson.com/users")
         .then((response) => response.json())
         .then((data) => {
           setUsers(data.users);
           setLoading(false);
         });
     }, []); // Empty dependency array = fetch data only once

     if (loading) return <p>loading...</p>;

     return (
       <section>
         <h1>Users List</h1>
         <ul>
           {users.map((user) => (
             <li key={user.id}>{user.firstName}</li>
           ))}
         </ul>
       </section>
     );
   }
   ```

   **How it works**:

   - **_useEffect_** runs once when the component mounts (**[] dependency array**).
   - **Loading state** ensures a smooth user experience.
   - **Data updates in the browser without refreshing the page**.

2. **Fetching Data on User Interaction (Button Click)**:

   Instead of fetching data **on mount**, you can **fetch it when a button is clicked**.  
   Useful for **on-demand fetching** (e.g., searching, pagination).

3. **Optimized Fetching with _useSWR_ (Automatic Caching & Re-fetching)**: [see example](/src/app/client-data-fetch/[swrId]/page.js)

   **_useSWR_** is a better alternative to **_useEffect_**, as it provides:

   - Automatic **Caching & Revalidation**.
   - Handles **loading and error states**.

4. **Fetching Data with Pagination**:

   If your API supports **pagination**, you can **update the pages numbers dynamically**.

   - _page_ state updates the **API URL Dynamically**.
   - Fetches **new data** when _page_ changes.
   - Prevents **unnecessary re-fetching**.

**When to Use Client-Side Fetching?**

- When data is **user-specific** (e.g., auth user data).
- When data **changes frequently** (e.g., notifications, search results).
- When you need **real-time updates** (use useSWR or WebSockets).
- **Avoid client-side fetching for SEO-related content (use server-side fetching instead)**.
