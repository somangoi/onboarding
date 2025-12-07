import { Button } from "@/shared/components/Button";
import { cn } from "@/shared/lib/utils";

interface StepFooterProps {
  primaryButton?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };

  skipButton?: {
    label?: string;
    onClick: () => void;
  };
  className?: string;
}

export function StepFooter({ primaryButton, skipButton, className }: StepFooterProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1 w-full", className)}>
      <div className="flex gap-3">{primaryButton && <Button label={primaryButton.label} onClick={primaryButton.onClick} disabled={primaryButton.disabled} variant="primary" />}</div>

      {skipButton && <Button label={skipButton.label || "나중에 응답하기"} onClick={skipButton.onClick} variant="ghost" />}
    </div>
  );
}
