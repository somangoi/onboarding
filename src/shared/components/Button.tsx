import { cn } from "../lib/utils";

type ButtonVariant = "primary" | "ghost";
export function Button({
  label,
  onClick,
  disabled = false,
  variant = "primary",
  className,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: ButtonVariant;
  className?: string | undefined;
}) {
  const baseStyles = "px-8 py-3 rounded-full text-[var(--font-size-button)] font-[var(--font-weight-button)] disabled:cursor-not-allowed cursor-pointer";

  const variantStyles = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)] active:scale-95 min-w-[200px] cursor-pointer",
    ghost: "text-[var(--color-text-sub)] underline cursor-pointer",
  };

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={cn(baseStyles, variantStyles[variant], className)}>
      {label}
    </button>
  );
}
