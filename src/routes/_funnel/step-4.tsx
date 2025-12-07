import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useOnboardingStore } from "@/entities/onboarding/store/useOnboardingStore";
import { StepHeader } from "@/features/onboarding/components";
import { Button } from "@/shared/components/Button";

export const Route = createFileRoute("/_funnel/step-4")({
  component: RouteComponent,
  staticData: {
    showProgress: false,
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const router = useRouter();
  const reset = useOnboardingStore((state) => state.reset);

  const handleStartService = () => {
    reset();
    navigate({ to: "/" });
  };

  const handleBack = () => {
    router.history.back();
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center gap-8 text-center pb-12">
      <StepHeader showBackButton onBack={handleBack} />

      <div className="flex flex-1 flex-col items-center justify-center gap-6">
        <p className="text-[length:var(--font-size-heading)] text-[color:var(--color-text)] font-[var(--font-weight-heading)]">
          관심사 설정이 완료 되었습니다!
          <br />
          지금부터 <span className="bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-secondary)] bg-clip-text text-transparent font-[var(--font-weight-heading)]">epic</span>과 함께
          성공적인 투자를 시작해 보세요
        </p>

        <Button label="epic AI 시작하기" onClick={handleStartService} className="bg-gradient-to-br from-[var(--color-primary)] from-35% to-[var(--color-secondary)]" />
      </div>
    </div>
  );
}
