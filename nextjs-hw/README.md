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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Learning Documentation

### What is Next.js ?

Next.js is an open-source JavaScript framework that is build on **top of React**, a popular JavaScript library for building user interfaces. It is designed to make it easier to create **server-rendered** React applications with a focus on developer productivity, performance, and SEO. Next.js provides a set of tools and conventions that simplify various aspects of building web applications.

### Features

- **Server-side rendering (SSR)**: Next.js allows you to render React components on the server sider before sending then to the client. This can imporve page load times and SEO, as search engines can easily index the content.
- **Static site generation (SSG)**: Next.js also supports static site generation, where you can pre-render pages at build time. This approach is great for content-heavy websites and can offer even better performance and SEO benfits.
- **API routes**: It offers a built-in API route feature that allows you to create serverless API endpoints within your Next.js project, making it easy to handle backend logic.

### Routing

Routing is like giving directions to a website. When you type a web address (URL) into your browser, routing tells the website which page or thing to show you. It's like a map that guides the website to the right place when you click a link or enter a web address. So, routing hepls the website know what to display based on what you're looking for.

### Link

- Link is a component provided by Next.js that allows you to create links to navigate between pages in your application.
- It's primarily used for declarative, client-side navigation. When you click on a link created with **Link**, it prevents the default browser full-page refresh and fetches the new page content on the client slide, resulting in a faster and smoother user experience.
- It's typically used in your component's JSX code to create clickable links that lead to other pages eithin your Next.js application.

### useRouter()

- useRouter is a hook provided by Next.js that allows you to access the router object and its properties within your component.
- It provides programmatic control over the router and allows you to navigate to different pages or perform other routing-related actions in response to user interactions or events within your component.
- It's useful when you need to handle navigation or access route- specific information directly in your component logic.

**Note :** If you want to ignore a specific folder to be as a route you just have to wrap the folder name with () parantheses.

```
app:
   (Auth):    // this route will be ignored
          login:
            page.jsx
          signin:
            page.jsx

Examples:
url/login
url/signin
```

### Dynamic Routes

Dynamic routes in Next.js refer to a **feature** that allows you to create web pages with variable or dynamic parts in the URL. Instead of defining individual routes for every possible URL, you can create a single **route pattern** that matches a variety of dynamic values. This is extremely useful when you have pages that share a common structure but differ based on specific information in the URL.

### Catch-All Routes

In Next.js, the **[...foldername]** notation indicates that you are using a catch-all route, which allows you to capture multiple URL segments and treat them as a dynamic array of values. This is useful when you want to create dynamic routes that can handle varying numbers of URL segments.

### redirect

The **redirect** function allows you to redirect the user to another URL. _redirect_ can be used in Server Components, Client Components, Route Handlers, and Server Actions.

### Server Components

React Server Components allows you to write UI that can be rendered and optionally cached on the server. By default, Next.js uses Server Components. This allows you to automatically implement server rendering with no additional configuration, and you can opt into using Client Components when needed.

### benfits of Server rendering

- Data Fetching
- Security
- Caching
- Bundle Sizes
- Initial Page Load and First Contentful Paint
- Search Engine Optimization and Social Network Shareability
- Streaming Server

### Client Components

Client Components allows you to write interactive UI that can be rendered on the client at request time. In Next.js client rendering is _opt-in_, meaning you have to explicitly decide what components React should render on the client. To use Client Component, you can add the React **"use client"** directive at the top of a file, above your imports.

### Benefits of Client Rendering

- Interactivity
- Browser APIs

### Layout

A Layout is like a _blueprint_ that helps you make all the pages of your website look the same. It's way to put common things, header, footer, and other stuff that appears on other page, in one place. This makes it easy to keep a similar look on all your web pages. So, a layout is a handy tool that lets you keep things _tidy and consistent_ on your website.

### client side

Next.js follows folder based routing, folder name act as a route and folder must have **page.js** file which will be served to the user. It doesn't matter how many files that folder contains it only server the page.js file to the user.

```
app/
|--about/
|  |--page.js
|--contact/
|  |--page.jsx
|  |--loading.js
```

### server side

Next.js consider folder as route, where each folder represents an endpoint and it must have **route.js** name file which will be acting as an end-point. Here methods like **GET, POST, PUT, DELETE** are defined inside the route.js file.

```
app/
|--api/
|  |--users/
|  |  |--route.js
|  |--data/
|  |  |--route.js
```

### Middleware(s)

In Next.js, middleware's are functions or pieces of code that runs in between a user request to a web page and server response. They help you to process and modify the request or response, adding **extra functionality** to your web application.

Use the file middleware.js in the root of your project to define Middleware. For example, at the same level as _pages_ or _app_ or inside _src_ if applicable.

**Note :** While only one middleware.js file is supported per project, you can still organize your middleware logic modularly. Break out middleware functionalities into seperate .js or .ts files and import them into your main middleware.js file.
