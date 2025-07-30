/**
 * The reason for this file is to provide the /register route to the route tree.
 * /routes/_auth/route.tsx requires /login & /register to be present,
 * but route.tsx does not use an Outlet to render this file.
 * Therefore, this file outputs nothing, but is simply present to satisfy the route tree.
 */
export const Route = createFileRoute({
  component: () => null,
});
