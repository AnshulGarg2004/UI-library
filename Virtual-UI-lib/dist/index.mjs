// src/components/Button/Button.tsx
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var variantClasses = {
  primary: [
    "bg-indigo-600 text-white border border-transparent",
    "hover:bg-indigo-700 active:bg-indigo-800",
    "focus-visible:ring-indigo-500",
    "shadow-sm hover:shadow-md"
  ].join(" "),
  secondary: [
    "bg-slate-100 text-slate-800 border border-slate-200",
    "hover:bg-slate-200 active:bg-slate-300",
    "focus-visible:ring-slate-400",
    "shadow-sm hover:shadow-md"
  ].join(" "),
  outline: [
    "bg-transparent text-indigo-600 border border-indigo-500",
    "hover:bg-indigo-50 active:bg-indigo-100",
    "focus-visible:ring-indigo-500"
  ].join(" "),
  ghost: [
    "bg-transparent text-slate-700 border border-transparent",
    "hover:bg-slate-100 active:bg-slate-200",
    "focus-visible:ring-slate-400"
  ].join(" ")
};
var sizeClasses = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-md",
  md: "h-10 px-4 text-sm gap-2 rounded-lg",
  lg: "h-12 px-6 text-base gap-2.5 rounded-xl"
};
var iconSizeClasses = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5"
};
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
var Button = forwardRef(
  ({
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
  }, ref) => {
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
      "cursor-pointer"
    ].join(" ");
    const iconOnlySizeOverride = {
      sm: "w-8 px-0",
      md: "w-10 px-0",
      lg: "w-12 px-0"
    };
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        type,
        disabled,
        "aria-disabled": disabled,
        onClick: disabled ? void 0 : onClick,
        className: cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          iconOnly && iconOnlySizeOverride[size],
          fullWidth && "w-full",
          className
        ),
        ...rest,
        children: [
          hasIcon && iconPosition === "left" && /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "shrink-0 flex items-center justify-center",
                iconSizeClasses[size]
              ),
              "aria-hidden": "true",
              children: icon
            }
          ),
          hasChildren && /* @__PURE__ */ jsx("span", { className: "leading-none", children }),
          hasIcon && iconPosition === "right" && /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "shrink-0 flex items-center justify-center",
                iconSizeClasses[size]
              ),
              "aria-hidden": "true",
              children: icon
            }
          )
        ]
      }
    );
  }
);
Button.displayName = "Button";

// src/components/Card/Card.tsx
import { forwardRef as forwardRef2 } from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var variantClasses2 = {
  elevated: [
    "bg-white border border-transparent",
    "shadow-sm hover:shadow-lg",
    "dark:bg-slate-900 dark:border-slate-800"
  ].join(" "),
  outlined: [
    "bg-white border border-slate-200",
    "hover:border-slate-300",
    "dark:bg-slate-900 dark:border-slate-700 dark:hover:border-slate-600"
  ].join(" "),
  filled: [
    "bg-slate-50 border border-transparent",
    "hover:bg-slate-100",
    "dark:bg-slate-800 dark:hover:bg-slate-700"
  ].join(" ")
};
var paddingClasses = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6"
};
var headerPaddingClasses = {
  none: "p-0",
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-6 py-4"
};
function cn2(...classes) {
  return classes.filter(Boolean).join(" ");
}
var Card = forwardRef2(
  ({
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
  }, ref) => {
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
      hoverable && "hover:shadow-md"
    ].join(" ");
    const containerClasses = cn2(
      baseClasses,
      variantClasses2[variant],
      fullWidth && "w-full",
      className
    );
    const handleKeyDown = (e) => {
      if (clickable && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick?.();
      }
    };
    return /* @__PURE__ */ jsxs2(
      "div",
      {
        ref,
        role: clickable ? "button" : void 0,
        tabIndex: clickable ? 0 : void 0,
        onClick: clickable ? onClick : void 0,
        onKeyDown: clickable ? handleKeyDown : void 0,
        className: containerClasses,
        ...rest,
        children: [
          hasHeader && /* @__PURE__ */ jsxs2(
            "div",
            {
              className: cn2(
                "border-b border-slate-200 dark:border-slate-700",
                headerPaddingClasses[padding]
              ),
              children: [
                title && /* @__PURE__ */ jsx2("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: title }),
                subtitle && /* @__PURE__ */ jsx2("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: subtitle })
              ]
            }
          ),
          /* @__PURE__ */ jsx2("div", { className: paddingClasses[padding], children }),
          hasFooter && /* @__PURE__ */ jsx2(
            "div",
            {
              className: cn2(
                "border-t border-slate-200 dark:border-slate-700",
                headerPaddingClasses[padding]
              ),
              children: footer
            }
          )
        ]
      }
    );
  }
);
Card.displayName = "Card";

// src/components/ToastButton/ToastButton.tsx
import { useState } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var ToastButton = ({ text = "Show Toast", onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 2e3);
    if (onClick) onClick();
  };
  return /* @__PURE__ */ jsxs3("div", { style: {
    position: "relative",
    width: "fit-content"
  }, children: [
    /* @__PURE__ */ jsx3(
      "button",
      {
        onClick: handleClick,
        style: {
          padding: "12px 24px",
          backgroundColor: "#6366f1",
          color: "#ffffff",
          border: "none",
          borderRadius: "12px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "16px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.25s ease",
          transform: isActive ? "translateY(-4px) scale(1.01)" : "none",
          boxShadow: isActive ? "0 10px 40px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.3)"
        },
        children: text
      }
    ),
    isActive && /* @__PURE__ */ jsx3("div", { style: {
      position: "absolute",
      top: "60px",
      left: "50%",
      transform: "translateX(-50%)",
      padding: "12px 24px",
      backgroundColor: "#1e293b",
      color: "#ffffff",
      borderRadius: "12px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontSize: "14px",
      fontWeight: "400",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
    }, children: "Message Sent!" })
  ] });
};

// src/components/ProductCard/ProductCard.tsx
import { useState as useState2 } from "react";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var ProductCard = ({ title = "Product Title", description = "This is a sample product description.", price = 49.99, image = "https://via.placeholder.com/300", onClick }) => {
  const [isHovered, setIsHovered] = useState2(false);
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      style: {
        width: "300px",
        borderRadius: "20px",
        backgroundColor: "#1e293b",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: isHovered ? "0 20px 50px rgba(0,0,0,0.5)" : "0 10px 40px rgba(0,0,0,0.4)",
        overflow: "hidden",
        transition: "all 0.25s ease",
        transform: isHovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        cursor: "pointer"
      },
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onClick,
      children: [
        /* @__PURE__ */ jsx4(
          "img",
          {
            src: image,
            alt: title,
            style: {
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderBottom: "1px solid rgba(255,255,255,0.08)"
            }
          }
        ),
        /* @__PURE__ */ jsxs4("div", { style: { padding: "16px" }, children: [
          /* @__PURE__ */ jsx4("h3", { style: { margin: "0", color: "#f8fafc", fontSize: "20px", fontWeight: "600" }, children: title }),
          /* @__PURE__ */ jsx4("p", { style: { margin: "8px 0", color: "#94a3b8", fontSize: "14px" }, children: description }),
          /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsxs4("span", { style: { color: "#6366f1", fontSize: "18px", fontWeight: "700" }, children: [
              "$",
              price.toFixed(2)
            ] }),
            /* @__PURE__ */ jsx4(
              "button",
              {
                style: {
                  backgroundColor: "#6366f1",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "8px 16px",
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 0.25s ease"
                },
                onMouseEnter: (e) => e.currentTarget.style.backgroundColor = "#7c3aed",
                onMouseLeave: (e) => e.currentTarget.style.backgroundColor = "#6366f1",
                children: "Add to Cart"
              }
            )
          ] })
        ] })
      ]
    }
  );
};

// src/components/DotLoader/DotLoader.tsx
import { useState as useState3, useEffect, useRef } from "react";
import { jsx as jsx5 } from "react/jsx-runtime";
var DotLoader = ({ size = 12, color = "#6366f1", speed = 0.8 }) => {
  const [activeDot, setActiveDot] = useState3(0);
  const intervalRef = useRef(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, speed * 300);
    return () => clearInterval(intervalRef.current);
  }, [speed]);
  return /* @__PURE__ */ jsx5("div", { style: { display: "flex", alignItems: "center", gap: size / 2 }, children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsx5(
    "div",
    {
      style: {
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        opacity: i === activeDot ? 1 : 0.4,
        transition: "opacity 0.3s ease"
      }
    },
    i
  )) });
};
export {
  Button,
  Card,
  DotLoader,
  ProductCard,
  ToastButton
};
