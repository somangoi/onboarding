import { ProgressDots } from "@/features/onboarding/components";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/_funnel")({
  component: RouteComponent,
});
function RouteComponent() {
  const { pathname } = useLocation();

  const currentStep = pathname.includes("step-") ? parseInt(pathname.split("step-")[1]) : 0;
  const isCompletePage = currentStep === 4;

  return (
    <div className="flex flex-col items-center my-20">
      <p className="text-[length:var(--font-size-heading)] text-[color:var(--color-text)] font-[var(--font-weight-heading)] text-center mb-8 flex-1">
        안녕하세요. 저는 AI 투자비서{" "}
        <span className="bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent font-[var(--font-weight-heading)]">epic AI</span> 입니다.
        <br />더 도움이 되는 AI 투자비서가 되기 위해 간단한 답변 부탁드려요.
      </p>
      <ProgressDots totalSteps={3} currentStep={currentStep} showProgress={!isCompletePage} />
      <div className="w-[800px] min-h-[450px] bg-white rounded-4xl p-[30px] mt-6 flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
