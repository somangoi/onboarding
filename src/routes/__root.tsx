import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "@/shared/components/Toaster";
import { Header } from "@/shared/components/Header";
import { useOnboardingStore } from "@/entities/onboarding/store/useOnboardingStore";

function RootComponent() {
  const reset = useOnboardingStore((state) => state.reset);

  const handleLogoClick = () => {
    reset();
  };

  return (
    <>
      <Header onLogoClick={handleLogoClick} />
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
