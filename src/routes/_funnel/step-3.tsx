import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_funnel/step-3")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>step-3</div>;
}
