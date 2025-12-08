import { cn } from "@/shared/lib/utils";
import { ChevronLeft } from "lucide-react";
import { Link, type LinkProps } from "@tanstack/react-router";

interface StepHeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  backTo?: LinkProps["to"];
  className?: string;
}

export function StepHeader({ title, subtitle, showBackButton = false, backTo, className }: StepHeaderProps) {
  const backContent = (
    <>
      <ChevronLeft className="w-4 h-4" />
      <span className="text-sm">이전 단계로</span>
    </>
  );

  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <Link
        to={backTo ?? "/"}
        preload="intent"
        className={cn(
          "self-start flex items-center gap-1 font-[var(--font-size-body-sm)] text-[var(--color-text-sub)] no-underline",
          showBackButton && backTo ? "cursor-pointer" : "invisible pointer-events-none"
        )}
      >
        {backContent}
      </Link>

      <div className="text-center">
        {title && <h1 className="text-[length:var(--font-size-heading)] font-[var(--font-weight-heading)] text-[color:var(--color-text)]">{title}</h1>}
        {subtitle && <p className="text-[length:var(--font-size-body-md)] text-[color:var(--color-primary)]">{subtitle}</p>}
      </div>
    </div>
  );
}
