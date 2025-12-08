import { createFileRoute } from "@tanstack/react-router";
import { useOnboardingStore } from "@/entities/onboarding/store/useOnboardingStore";
import { onboardingOptions, useOnboardingOptions } from "@/entities/onboarding/api/useOnboardingOptions";
import { canMoveFromStep1 } from "@/entities/onboarding/model/validation";
import { StepHeader, StepFooter, OptionGrid } from "@/features/onboarding/components";
import { queryClient } from "@/shared/lib/query-client";

export const Route = createFileRoute("/_funnel/step-1")({
  component: RouteComponent,
  staticData: {
    showProgress: true,
  },
  loader: async () => {
    return queryClient.ensureQueryData(onboardingOptions);
  },
});

function RouteComponent() {
  const { data: options, isLoading } = useOnboardingOptions();
  const selectedUserType = useOnboardingStore((state) => state.selectedUserType);
  const setUserType = useOnboardingStore((state) => state.setUserType);
  const setMaxStep = useOnboardingStore((state) => state.setMaxStep);

  const handleToggle = (id: string) => {
    setUserType(id);
  };

  const handleMoveToNextStep = () => {
    setMaxStep(2);
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
          onClick: handleMoveToNextStep,
        }}
        skipButton={{
          to: "/step-2",
          onClick: handleMoveToNextStep,
        }}
      />
    </div>
  );
}
