import { cn } from "@/shared/lib/utils";
import { OptionCard } from "./OptionCard";
import type { Option } from "@/entities/onboarding/model/types";

interface OptionGridProps {
  options: Option[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  columns?: 2 | 4;
  className?: string;
}

export function OptionGrid({ options, selectedIds, onToggle, columns = 2, className }: OptionGridProps) {
  const gridColsClass = {
    2: "grid-cols-2",
    4: "grid-cols-4",
  }[columns];

  return (
    <div className={cn("grid gap-4 w-full max-w-3xl", gridColsClass, className)}>
      {options.map((option) => (
        <OptionCard key={option.id} id={option.id} label={option.label} isSelected={selectedIds.includes(option.id)} onToggle={onToggle} isSmall={columns === 4} />
      ))}
    </div>
  );
}
