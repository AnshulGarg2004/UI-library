"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Button: () => Button,
  Card: () => Card,
  ProductCard: () => ProductCard,
  ToastButton: () => ToastButton
});
module.exports = __toCommonJS(index_exports);

// src/components/Button/Button.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
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
var Button = (0, import_react.forwardRef)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
          hasIcon && iconPosition === "left" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
          hasChildren && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "leading-none", children }),
          hasIcon && iconPosition === "right" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_react2 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
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
var Card = (0, import_react2.forwardRef)(
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
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
          hasHeader && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "div",
            {
              className: cn2(
                "border-b border-slate-200 dark:border-slate-700",
                headerPaddingClasses[padding]
              ),
              children: [
                title && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: title }),
                subtitle && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: subtitle })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: paddingClasses[padding], children }),
          hasFooter && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
var import_react3 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var ToastButton = ({ text = "Show Toast", onClick }) => {
  const [isActive, setIsActive] = (0, import_react3.useState)(false);
  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 2e3);
    if (onClick) onClick();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: {
    position: "relative",
    width: "fit-content"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
    isActive && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: {
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
var import_react4 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var ProductCard = ({ title = "Product Title", description = "This is a sample product description.", price = 49.99, image = "https://via.placeholder.com/300", onClick }) => {
  const [isHovered, setIsHovered] = (0, import_react4.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { padding: "16px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { style: { margin: "0", color: "#f8fafc", fontSize: "20px", fontWeight: "600" }, children: title }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { style: { margin: "8px 0", color: "#94a3b8", fontSize: "14px" }, children: description }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { style: { color: "#6366f1", fontSize: "18px", fontWeight: "700" }, children: [
              "$",
              price.toFixed(2)
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Button,
  Card,
  ProductCard,
  ToastButton
});
