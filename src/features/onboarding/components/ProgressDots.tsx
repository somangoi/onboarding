import { cn } from "@/shared/lib/utils";

interface ProgressDotsProps {
  totalSteps: number;
  currentStep: number;
  className?: string;
}

export function ProgressDots({ totalSteps, currentStep, className }: ProgressDotsProps) {
  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isLast = stepNumber === totalSteps;

        return (
          <>
            <div
              key={stepNumber}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-300",
                isActive && "bg-[var(--color-primary)] text-white",
                !isActive && "bg-[#E1E2E7] text-[var(--color-text-sub)]"
              )}
            >
              {stepNumber}
            </div>
            {!isLast && (
              <div className="flex items-center gap-1 mx-1">
                <div className="w-[3px] h-[1px] rounded-full bg-[var(--color-text-sub)]"></div>
                <div className="w-[3px] h-[1px] rounded-full bg-[var(--color-text-sub)]"></div>
                <div className="w-[3px] h-[1px] rounded-full bg-[var(--color-text-sub)]"></div>
                <div className="w-[3px] h-[1px] rounded-full bg-[var(--color-text-sub)]"></div>
                <div className="w-[3px] h-[1px] rounded-full bg-[var(--color-text-sub)]"></div>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
