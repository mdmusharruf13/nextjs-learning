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
