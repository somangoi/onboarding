import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useOnboardingStore } from "@/entities/onboarding/store/useOnboardingStore";
import TextLogo from "@/assets/logo/text-logo.png";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const reset = useOnboardingStore((state) => state.reset);

  const handleStart = () => {
    reset();
    navigate({ to: "/step-1" });
  };

  return (
    <div className="h-[calc(100vh-56px)] flex flex-col items-center justify-center">
      <img src={TextLogo} alt="logo" className="h-9 object-contain mb-2" />
      <p className="text-[length:var(--font-size-heading)] text-[color:var(--color-text)] font-[var(--font-weight-heading)] text-center mb-8">
        차원이 다른 <span className="bg-gradient-to-b from-blue-500 to-purple-600 bg-clip-text text-transparent font-[var(--font-weight-heading)]">AI</span> 투자비서
      </p>

      <button
        type="button"
        onClick={handleStart}
        className="px-12 py-4 bg-[var(--color-primary)] text-white rounded-full text-[var(--font-size-button)] font-[var(--font-weight-button)] min-w-[240px]"
      >
        서비스 시작하기
      </button>
    </div>
  );
}
