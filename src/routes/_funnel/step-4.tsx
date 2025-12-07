import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_funnel/step-4")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>step-4</div>;
}
