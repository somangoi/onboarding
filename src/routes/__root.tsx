import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "@/shared/components/Toaster";
import { Header } from "@/shared/components/Header";
import { useOnboardingStore } from "@/entities/onboarding/store/useOnboardingStore";

export const Route = createRootRoute({
  component: () => {
    const navigate = useNavigate();
    const reset = useOnboardingStore((state) => state.reset);

    const handleLogoClick = () => {
      reset();
      navigate({ to: "/" });
    };

    return (
      <>
        <Header onLogoClick={handleLogoClick} />
        <Outlet />
        <Toaster />
        <TanStackRouterDevtools />
      </>
    );
  },
});
