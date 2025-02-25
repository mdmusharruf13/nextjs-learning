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
