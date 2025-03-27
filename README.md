# Angular SSR Redirect Bug Reproduction

This project demonstrates a bug in Angular's SSR (Server-Side Rendering) where using `redirectTo` in routes causes a 404 status code error.

## Bug Description

When using `redirectTo` in route config, the server throws an error:

```
Error: Error(s) occurred while extracting routes:
- The '404' status code is not a valid redirect response code. Please use one of the following redirect response codes: 301, 302, 303, 307, 308.
```

## Steps to Reproduce

1. Clone the repository:

```bash
git clone https://github.com/vzarskus/catch-all-route-bug.git
cd catch-all-route-bug
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run start
```

4. Visit any URL in the browser (e.g., http://localhost:4200/home or just http://localhost:4200)

The error will appear in the terminal.

## Bug Source

The bug happens because of route configuration in `src/app/app.routes.ts`:

```typescript
export const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "home", redirectTo: "", pathMatch: "full" }, // This line causes the issue
  {
    path: "features",
    loadChildren: () => import("./features/features.routes").then((m) => m.FEATURES_ROUTES),
  },
  { path: "**", component: NotFoundComponent },
];
```

`redirectTo` seems to have a buggy interaction with catch-all route (`path: "**"`).
It has `status: 404` configured in `app.routes.server.ts`.

## Current Workaround

To make the redirects work, you need to explicitly register the redirect routes in `app.routes.server.ts`:

```typescript
export const serverRoutes: ServerRoute[] = [
  {
    path: "",
    renderMode: RenderMode.Prerender,
  },
  // Registering this fixes the issue.
  {
    path: "home",
    renderMode: RenderMode.Client, // or any other render mode
  },

  // Other routes...

  // Catch-all route
  {
    path: "**",
    renderMode: RenderMode.Client,
    status: 404,
  },
];
```

Note: The same issue also occurs with nested redirects in lazy-loaded routes (e.g., in `features.routes.ts`).

## Why Is This a Bug

1. The workaround required for the app that has such a setup is not obvious.
2. The render mode chosen for the redirect route doesn't matter - any mode will fix the issue.
3. This is unexpected behavior as redirects should work without needing explicit server route registration.
4. The error message suggests a 404 status code issue, but the actual problem is related to route registration.
5. This creates unnecessary complexity and potential maintenance issues.

## Expected Behavior

The application should work properly with `redirectTo` routes and catch-all route which returns 404 status code (very common practice) without throwing any server errors or requiring additional route registration.
