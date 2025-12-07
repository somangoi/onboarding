import { createFileRoute, redirect } from "@tanstack/react-router";
import { useOnboardingStore } from "@/entities/onboarding/store/useOnboardingStore";
import { useOnboardingOptions } from "@/entities/onboarding/api/useOnboardingOptions";
import { canMoveFromStep2 } from "@/entities/onboarding/model/validation";
import { StepHeader, StepFooter, OptionGrid } from "@/features/onboarding/components";

export const Route = createFileRoute("/_funnel/step-2")({
  component: RouteComponent,
  staticData: {
    showProgress: true,
  },
  beforeLoad: () => {
    const { maxStep } = useOnboardingStore.getState();

    if (maxStep < 2) {
      throw redirect({ to: "/step-1" });
    }
  },
});

function RouteComponent() {
  const { data: options, isLoading } = useOnboardingOptions();
  const selectedInterests = useOnboardingStore((state) => state.selectedInterests);
  const toggleInterest = useOnboardingStore((state) => state.toggleInterest);
  const setMaxStep = useOnboardingStore((state) => state.setMaxStep);

  const handleToggle = (id: string) => {
    toggleInterest(id);
  };

  const handleMoveToNextStep = () => {
    setMaxStep(3);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--color-text-sub)]">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <StepHeader title="epic AI에 기대하는 점을 알려주세요." subtitle="(다중 선택 가능)" showBackButton backTo="/step-1" />
      <OptionGrid options={options?.interests || []} selectedIds={selectedInterests} onToggle={handleToggle} columns={2} />
      <StepFooter
        primaryButton={{
          to: "/step-3",
          label: "선택 완료",
          disabled: !canMoveFromStep2(selectedInterests),
          onClick: handleMoveToNextStep,
        }}
        skipButton={{
          to: "/step-3",
          onClick: handleMoveToNextStep,
        }}
      />
    </div>
  );
}
