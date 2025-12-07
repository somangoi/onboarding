import { cn } from "@/shared/lib/utils";

type ButtonVariant = "primary" | "ghost";

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

function Button({ label, onClick, disabled = false, variant = "primary" }: { label: string; onClick: () => void; disabled?: boolean; variant?: ButtonVariant }) {
  const baseStyles = "px-8 py-3 rounded-full text-[var(--font-size-button)] font-[var(--font-weight-button)] transition-all duration-200  disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)] active:scale-95 min-w-[200px] cursor-pointer",
    ghost: "text-[var(--color-text-sub)] hover:text-[var(--color-text)] underline cursor-pointer",
  };

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cn(baseStyles, variantStyles[variant])}>
      {label}
    </button>
  );
}

export function StepFooter({ primaryButton, skipButton, className }: StepFooterProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1 w-full", className)}>
      <div className="flex gap-3">{primaryButton && <Button label={primaryButton.label} onClick={primaryButton.onClick} disabled={primaryButton.disabled} variant="primary" />}</div>

      {skipButton && <Button label={skipButton.label || "나중에 응답하기"} onClick={skipButton.onClick} variant="ghost" />}
    </div>
  );
}
