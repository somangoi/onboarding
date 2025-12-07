import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "@/shared/components/ui/Toaster";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">header</div>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  ),
});
