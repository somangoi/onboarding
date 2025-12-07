import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome Home!</h1>
    </div>
  );
}
