import React, { forwardRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type CardVariant = "elevated" | "outlined" | "filled";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick" | "title"> {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
  className?: string;
}

// ─── Class Maps ──────────────────────────────────────────────────────────────

const variantClasses: Record<CardVariant, string> = {
  elevated: [
    "bg-white border border-transparent",
    "shadow-sm hover:shadow-lg",
    "dark:bg-slate-900 dark:border-slate-800",
  ].join(" "),

  outlined: [
    "bg-white border border-slate-200",
    "hover:border-slate-300",
    "dark:bg-slate-900 dark:border-slate-700 dark:hover:border-slate-600",
  ].join(" "),

  filled: [
    "bg-slate-50 border border-transparent",
    "hover:bg-slate-100",
    "dark:bg-slate-800 dark:hover:bg-slate-700",
  ].join(" "),
};

const paddingClasses: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
};

const headerPaddingClasses: Record<CardPadding, string> = {
  none: "p-0",
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-6 py-4",
};

// ─── Utility ─────────────────────────────────────────────────────────────────

function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

// ─── Component ───────────────────────────────────────────────────────────────

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      title,
      subtitle,
      footer,
      variant = "elevated",
      padding = "md",
      hoverable = false,
      clickable = false,
      onClick,
      fullWidth = false,
      className,
      ...rest
    },
    ref
  ) => {
    const hasHeader = Boolean(title || subtitle);
    const hasFooter = Boolean(footer);

    const baseClasses = [
      // Layout
      "rounded-lg overflow-hidden",
      // Transition
      "transition-all duration-150 ease-in-out",
      // Focus ring
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
      // Cursor
      clickable && "cursor-pointer",
      // Hoverable states
      hoverable && "hover:shadow-md",
    ].join(" ");

    const containerClasses = cn(
      baseClasses,
      variantClasses[variant],
      fullWidth && "w-full",
      className
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (clickable && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick?.();
      }
    };

    return (
      <div
        ref={ref}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={clickable ? onClick : undefined}
        onKeyDown={clickable ? handleKeyDown : undefined}
        className={containerClasses}
        {...rest}
      >
        {/* Header */}
        {hasHeader && (
          <div
            className={cn(
              "border-b border-slate-200 dark:border-slate-700",
              headerPaddingClasses[padding]
            )}
          >
            {title && (
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Body */}
        <div className={paddingClasses[padding]}>{children}</div>

        {/* Footer */}
        {hasFooter && (
          <div
            className={cn(
              "border-t border-slate-200 dark:border-slate-700",
              headerPaddingClasses[padding]
            )}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";
