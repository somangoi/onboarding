import { createFileRoute } from "@tanstack/react-router";
import { useOnboardingStore } from "@/entities/onboarding/store/useOnboardingStore";
import { useOnboardingOptions } from "@/entities/onboarding/api/useOnboardingOptions";
import { canMoveFromStep3 } from "@/entities/onboarding/model/validation";
import { StepHeader, StepFooter, OptionGrid } from "@/features/onboarding/components";

export const Route = createFileRoute("/_funnel/step-3")({
  component: RouteComponent,
  staticData: {
    showProgress: true,
  },
});

function RouteComponent() {
  const { data: options, isLoading } = useOnboardingOptions();

  const selectedIndustries = useOnboardingStore((state) => state.selectedIndustries);
  const toggleIndustry = useOnboardingStore((state) => state.toggleIndustry);

  const handleToggle = (id: string) => {
    toggleIndustry(id);
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
      <StepHeader title="어떤 업종에 관심있으신가요?" subtitle="선택하신 업종의 시가총액 상위 기업이 [관심그룹]에 추가됩니다. (복수선택 가능)" showBackButton backTo="/step-2" />
      <OptionGrid options={options?.industries || []} selectedIds={selectedIndustries} onToggle={handleToggle} columns={4} />
      <StepFooter
        primaryButton={{
          label: "선택 완료",
          disabled: !canMoveFromStep3(selectedIndustries),
          to: "/step-4",
        }}
        skipButton={{
          to: "/step-4",
        }}
      />
    </div>
  );
}
