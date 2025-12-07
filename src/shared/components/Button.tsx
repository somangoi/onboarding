import { cn } from "../lib/utils";
import { Link, type LinkProps } from "@tanstack/react-router";

type ButtonVariant = "primary" | "ghost";

type Button = {
  label: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  isPending?: boolean;
};

type ButtonAsButton = Button & {
  as?: "button";
};

type ButtonAsLink = Button & {
  as: "link";
  to: LinkProps["to"];
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Spinner = () => {
  return <div className="w-[24px] h-[24px] border-2 border-white border-t-transparent rounded-full animate-spin"></div>;
};

export function Button(props: ButtonProps) {
  const baseStyles = "px-8 py-3 rounded-full text-[var(--font-size-button)] font-[var(--font-weight-button)] disabled:cursor-not-allowed cursor-pointer inline-block text-center no-underline";

  const variantStyles = {
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)] active:scale-95 min-w-[200px] cursor-pointer",
    ghost: "text-[var(--color-text-sub)] underline cursor-pointer",
  };

  const { label, disabled = false, variant = "primary", className, isPending = false } = props;

  if (isPending) {
    return (
      <div className={cn(baseStyles, variantStyles[variant], className, "cursor-not-allowed opacity-50 flex items-center justify-center")}>
        <Spinner />
      </div>
    );
  }

  if (props.as === "link") {
    return (
      <Link to={props.to} disabled={disabled} onClick={props.onClick} className={cn(baseStyles, variantStyles[variant], className, disabled && "pointer-events-none opacity-50")}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={props.onClick} disabled={disabled} className={cn(baseStyles, variantStyles[variant], className)}>
      {label}
    </button>
  );
}
