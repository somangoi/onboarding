import { cn } from "@/shared/lib/utils";

interface OptionCardProps {
  id: string;
  label: string;
  isSelected: boolean;
  onToggle: (id: string) => void;
  className?: string;
  isSmall?: boolean;
}

export function OptionCard({ id, label, isSelected, onToggle, className, isSmall = false }: OptionCardProps) {
  const fontSizeClass = isSmall ? "text-[length:var(--font-size-body-sm)]" : "text-[length:var(--font-size-body)]";
  const paddingClass = isSmall ? "px-4 py-2" : "px-6 py-4";
  return (
    <button
      type="button"
      onClick={() => onToggle(id)}
      className={cn(
        "rounded-[4px] font-[var(--font-weight-body)]",
        "border-[1px] border-[color:var(--color-text-sub)] cursor-pointer",
        isSelected ? "bg-[#E1E2E7] " : "bg-white text-[color:var(--color-text)] hover:border-[color:var(--color-text)]",
        className,
        fontSizeClass,
        paddingClass
      )}
    >
      {label}
    </button>
  );
}
