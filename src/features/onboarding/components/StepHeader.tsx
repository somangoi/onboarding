import { cn } from "@/shared/lib/utils";
import { ChevronLeft } from "lucide-react";

interface StepHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
}

export function StepHeader({ title, subtitle, showBackButton = false, onBack, className }: StepHeaderProps) {
  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <button
        onClick={onBack}
        className={cn("self-start flex items-center gap-1 font-[var(--font-size-body-sm)] text-[var(--color-text-sub)] cursor-pointer", !showBackButton && "invisible")}
        type="button"
        disabled={!showBackButton}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="text-sm">이전 단계로</span>
      </button>

      <div className="text-center">
        {title && <h1 className="text-[length:var(--font-size-heading)] font-[var(--font-weight-heading)] text-[color:var(--color-text)]">{title}</h1>}
        {subtitle && <p className="text-[length:var(--font-size-body-md)] text-[color:var(--color-primary)]">{subtitle}</p>}
      </div>
    </div>
  );
}
