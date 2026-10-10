import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary:
        "bg-gradient-to-r from-terracotta-500 to-saffron-500 text-white hover:from-terracotta-600 hover:to-saffron-600 shadow-lg shadow-terracotta-500/20 hover:shadow-terracotta-500/40",
      secondary:
        "bg-majorelle-600 text-white hover:bg-majorelle-700 shadow-lg shadow-majorelle-600/20",
      ghost:
        "bg-transparent text-night-800 dark:text-sand-100 hover:bg-sand-100 dark:hover:bg-white/5",
      outline:
        "border-2 border-night-800 dark:border-sand-100 text-night-800 dark:text-sand-100 hover:bg-night-800 hover:text-white dark:hover:bg-sand-100 dark:hover:text-night-900 transition-colors",
    };
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-5 py-2.5 text-sm",
      lg: "px-7 py-3.5 text-base",
    };
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "outline" | "warning";
  className?: string;
}) {
  const variants = {
    default: "bg-sand-200 text-night-800 dark:bg-white/10 dark:text-sand-100",
    accent: "bg-terracotta-500 text-white",
    success: "bg-emerald-ma-500 text-white",
    outline: "border border-night-800/20 dark:border-white/20 text-night-800 dark:text-sand-100",
    warning: "bg-saffron-400 text-night-900",
  };
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("bg-white dark:bg-white/5 rounded-2xl shadow-sm dark:shadow-black/30 border border-sand-200/50 dark:border-white/10 overflow-hidden", className)}>
      {children}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-sand-200 dark:border-white/10 text-night-800 dark:text-sand-100 placeholder:text-night-800/40 dark:placeholder:text-sand-100/40 focus:outline-none focus:ring-2 focus:ring-terracotta-500 transition",
        props.className
      )}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={cn("mb-12 max-w-2xl", align === "center" ? "mx-auto text-center" : "text-start")}>
      {eyebrow && (
        <span className="text-sm font-semibold tracking-wider uppercase text-terracotta-500 dark:text-saffron-400 mb-2 block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-bold text-night-800 dark:text-sand-100 text-balance mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-night-800/70 dark:text-sand-100/70 text-pretty">{subtitle}</p>
      )}
    </div>
  );
}
