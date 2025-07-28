/**
 * The reason for this file is to provide the /login route to the route tree.
 * /routes/_auth/route.tsx requires /login & /register to be present in its code,
 * but does not use an Outlet to render this file directly.
 * Therefore, this file outputs nothing, but is simply present to satisfy the route tree.
 */
export const Route = createFileRoute({
  component: () => null,
});
