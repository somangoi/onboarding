import { Button } from "@/shared/components/Button";
import { cn } from "@/shared/lib/utils";
import type { LinkProps } from "@tanstack/react-router";

type PrimaryButton = {
  label: string;
  to: LinkProps["to"];
  disabled?: boolean;
  onClick?: () => void;
};

type SkipButton = {
  label?: string;
  to: LinkProps["to"];
  onClick?: () => void;
};

interface StepFooterProps {
  primaryButton?: PrimaryButton;
  skipButton?: SkipButton;
  className?: string;
}

export function StepFooter({ primaryButton, skipButton, className }: StepFooterProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1 w-full", className)}>
      <div className="flex gap-3">
        {primaryButton && <Button as="link" to={primaryButton.to} label={primaryButton.label} disabled={primaryButton.disabled} onClick={primaryButton.onClick} variant="primary" />}
      </div>

      {skipButton && <Button as="link" to={skipButton.to} label={skipButton.label || "나중에 응답하기"} onClick={skipButton.onClick} variant="ghost" />}
    </div>
  );
}
