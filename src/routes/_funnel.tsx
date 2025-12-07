import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_funnel")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Onboarding Funnel Layout</h1>
      <Outlet />
    </div>
  );
}
