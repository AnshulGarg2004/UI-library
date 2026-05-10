import React, { forwardRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
    children?: React.ReactNode;
    onClick?: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    className?: string;
}

// ─── Class Maps ──────────────────────────────────────────────────────────────

const variantClasses: Record<ButtonVariant, string> = {
    primary: [
        "bg-indigo-600 text-white border border-transparent",
        "hover:bg-indigo-700 active:bg-indigo-800",
        "focus-visible:ring-indigo-500",
        "shadow-sm hover:shadow-md",
    ].join(" "),

    secondary: [
        "bg-slate-100 text-slate-800 border border-slate-200",
        "hover:bg-slate-200 active:bg-slate-300",
        "focus-visible:ring-slate-400",
        "shadow-sm hover:shadow-md",
    ].join(" "),

    outline: [
        "bg-transparent text-indigo-600 border border-indigo-500",
        "hover:bg-indigo-50 active:bg-indigo-100",
        "focus-visible:ring-indigo-500",
    ].join(" "),

    ghost: [
        "bg-transparent text-slate-700 border border-transparent",
        "hover:bg-slate-100 active:bg-slate-200",
        "focus-visible:ring-slate-400",
    ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
    md: "h-10 px-4 text-sm gap-2 rounded-lg",
    lg: "h-12 px-6 text-base gap-2.5 rounded-xl",
};

const iconSizeClasses: Record<ButtonSize, string> = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
};

// ─── Utility ─────────────────────────────────────────────────────────────────

function cn(...classes: (string | undefined | false | null)[]): string {
    return classes.filter(Boolean).join(" ");
}

// ─── Component ───────────────────────────────────────────────────────────────

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            onClick,
            variant = "primary",
            size = "md",
            disabled = false,
            fullWidth = false,
            icon,
            iconPosition = "left",
            className,
            type = "button",
            ...rest
        },
        ref
    ) => {
        const hasIcon = Boolean(icon);
        const hasChildren = Boolean(children);
        const iconOnly = hasIcon && !hasChildren;

        const baseClasses = [
            // Layout
            "inline-flex items-center justify-center font-medium",
            "select-none whitespace-nowrap",
            // Transition
            "transition-all duration-150 ease-in-out",
            // Focus ring
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            // Disabled
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
            // Cursor
            "cursor-pointer",
        ].join(" ");

        // Icon-only buttons: override horizontal padding to make them square
        const iconOnlySizeOverride: Record<ButtonSize, string> = {
            sm: "w-8 px-0",
            md: "w-10 px-0",
            lg: "w-12 px-0",
        };

        return (
            <button
                ref={ref}
                type={type}
                disabled={disabled}
                aria-disabled={disabled}
                onClick={disabled ? undefined : onClick}
                className={cn(
                    baseClasses,
                    variantClasses[variant],
                    sizeClasses[size],
                    iconOnly && iconOnlySizeOverride[size],
                    fullWidth && "w-full",
                    className
                )}
                {...rest}
            >
                {/* Icon — left */}
                {hasIcon && iconPosition === "left" && (
                    <span
                        className={cn(
                            "shrink-0 flex items-center justify-center",
                            iconSizeClasses[size]
                        )}
                        aria-hidden="true"
                    >
                        {icon}
                    </span>
                )}

                {/* Label */}
                {hasChildren && (
                    <span className="leading-none">{children}</span>
                )}

                {/* Icon — right */}
                {hasIcon && iconPosition === "right" && (
                    <span
                        className={cn(
                            "shrink-0 flex items-center justify-center",
                            iconSizeClasses[size]
                        )}
                        aria-hidden="true"
                    >
                        {icon}
                    </span>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";