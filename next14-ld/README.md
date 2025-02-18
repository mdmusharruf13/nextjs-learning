## Next.Js

### Rendering

- Server Side Rendering (SSR)
- Client Side Rendering (CSR)

### SSR

- Pros:
  - The initial page load is faster.
  - Better for old devices and slow internet connection.
  - Better SEO
- Cons:
  - Less Interaction.
  - Increased server loads.
  - Slower Subsequent page loads.
  - State Management complexity.

### CSR

- Pros:
  - Better performance after initia load.
  - Less server load.
  - Best for the user interactivity.
- Cons:
  - May affect SEO.
  - Slower initial load.
  - Dependency on client resources.

### Hydration Error

Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This is happen if a S.S.Rendered client component used.

- A server/client branch `if (typeof window !== 'undefined)`.
- Variable input such as `Date.now()` or `Math.random()` which changes each time is called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

### dynamic()

This function lets you dynamically import a component. It uses React.lazy() with Suspense under the hood.

### .env

```
// defining variables
NEXT_PUBLIC_NAME=musharruf

// using those variables in code
console.log(process.env.NEXT_PUBLIC_NAME);
```
