import { createFileRoute } from "@tanstack/react-router";
import { useOnboardingStore } from "@/entities/onboarding/store/useOnboardingStore";
import { useOnboardingOptions } from "@/entities/onboarding/api/useOnboardingOptions";
import { canMoveFromStep1 } from "@/entities/onboarding/model/validation";
import { StepHeader, StepFooter, OptionGrid } from "@/features/onboarding/components";

export const Route = createFileRoute("/_funnel/step-1")({
  component: RouteComponent,
  staticData: {
    showProgress: true,
  },
});

function RouteComponent() {
  const { data: options, isLoading } = useOnboardingOptions();
  const selectedUserType = useOnboardingStore((state) => state.selectedUserType);
  const setUserType = useOnboardingStore((state) => state.setUserType);

  const handleToggle = (id: string) => {
    setUserType(id);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-[var(--color-text-sub)]">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <StepHeader title="김에픽님은 다음 중 어디에 해당되시나요?" />
      <OptionGrid options={options?.userTypes || []} selectedIds={selectedUserType ? [selectedUserType] : []} onToggle={handleToggle} columns={2} />
      <StepFooter
        primaryButton={{
          to: "/step-2",
          label: "선택 완료",
          disabled: !canMoveFromStep1(selectedUserType),
        }}
        skipButton={{
          to: "/step-2",
        }}
      />
    </div>
  );
}
