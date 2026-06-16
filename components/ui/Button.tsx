import Link from "next/link";
import type { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const variants = {
  primary:
    "bg-brand-purple text-brand-white shadow-glow hover:bg-brand-purple/85 focus-visible:outline-brand-pink",
  secondary:
    "border border-brand-purple/35 bg-white/[0.08] text-brand-white hover:border-brand-pink/45 hover:bg-white/[0.12] focus-visible:outline-brand-pink",
  ghost:
    "text-brand-light hover:bg-white/[0.08] focus-visible:outline-brand-pink",
};

export function Button({
  children,
  href,
  type = "button",
  variant = "primary",
  className,
  disabled,
  target,
  rel,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-bold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
