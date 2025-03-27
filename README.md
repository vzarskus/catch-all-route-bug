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

4. Visit any URL in the browser (e.g., http://localhost:4200/features/view or just http://localhost:4200)

The error will appear in the terminal.

## Bug Source

The bug happens because of route configuration `src/app/features/features.routes.ts`.
`redirectTo` seems to have a buggy interaction with catch-all route registered in `src/app/app.routes.ts`.

```typescript
{
  path: '',
  component: FeaturesComponent,
  children: [
    { path: 'details', component: FeatureDetailsComponent },
    { path: 'view', redirectTo: 'details', pathMatch: 'full' }, // This line causes the issue
  ],
}
```

Remove the `redirectTo` line to fix the issue:

```typescript
{
  path: '',
  component: FeaturesComponent,
  children: [
    { path: 'details', component: FeatureDetailsComponent },
    // Remove the redirect line
  ],
}
```

## Expected Behavior

The application should work properly with nested `redirectTo` routes and catch-all route which returns 404 status code (very common practice) without throwing any server errors.
