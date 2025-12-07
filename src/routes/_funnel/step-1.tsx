import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_funnel/step-1")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>step-1</div>;
}
