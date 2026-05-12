// src/components/Card/Card.tsx
import { forwardRef } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var variantClasses = {
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
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
var Card = forwardRef(
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
    const containerClasses = cn(
      baseClasses,
      variantClasses[variant],
      fullWidth && "w-full",
      className
    );
    const handleKeyDown = (e) => {
      if (clickable && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        onClick?.();
      }
    };
    return /* @__PURE__ */ jsxs(
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
          hasHeader && /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "border-b border-slate-200 dark:border-slate-700",
                headerPaddingClasses[padding]
              ),
              children: [
                title && /* @__PURE__ */ jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: title }),
                subtitle && /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: subtitle })
              ]
            }
          ),
          /* @__PURE__ */ jsx("div", { className: paddingClasses[padding], children }),
          hasFooter && /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
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
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ToastButton = ({ text = "Show Toast", onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 2e3);
    if (onClick) onClick();
  };
  return /* @__PURE__ */ jsxs2("div", { style: {
    position: "relative",
    width: "fit-content"
  }, children: [
    /* @__PURE__ */ jsx2(
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
    isActive && /* @__PURE__ */ jsx2("div", { style: {
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
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var ProductCard = ({ title = "Product Title", description = "This is a sample product description.", price = 49.99, image = "https://via.placeholder.com/300", onClick }) => {
  const [isHovered, setIsHovered] = useState2(false);
  return /* @__PURE__ */ jsxs3(
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
        /* @__PURE__ */ jsx3(
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
        /* @__PURE__ */ jsxs3("div", { style: { padding: "16px" }, children: [
          /* @__PURE__ */ jsx3("h3", { style: { margin: "0", color: "#f8fafc", fontSize: "20px", fontWeight: "600" }, children: title }),
          /* @__PURE__ */ jsx3("p", { style: { margin: "8px 0", color: "#94a3b8", fontSize: "14px" }, children: description }),
          /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsxs3("span", { style: { color: "#6366f1", fontSize: "18px", fontWeight: "700" }, children: [
              "$",
              price.toFixed(2)
            ] }),
            /* @__PURE__ */ jsx3(
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

// src/components/NeonToggleButton/NeonToggleButton.tsx
import { useState as useState3 } from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var NeonToggleButton = ({
  activeColor = "#0ea5e9",
  inactiveColor = "#1e293b",
  initialActive = false,
  onClick = () => {
  }
}) => {
  const [isActive, setIsActive] = useState3(initialActive);
  const handleClick = () => {
    setIsActive(!isActive);
    onClick();
  };
  return /* @__PURE__ */ jsx4(
    "button",
    {
      onClick: handleClick,
      style: {
        position: "relative",
        width: "80px",
        height: "40px",
        borderRadius: "20px",
        border: "none",
        cursor: "pointer",
        background: isActive ? activeColor : inactiveColor,
        boxShadow: isActive ? "0 0 10px " + alpha(activeColor, 0.8) : "none",
        transition: "all 0.25s ease",
        outline: "none"
      },
      onMouseEnter: (e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.transform = "scale(1)";
      },
      children: /* @__PURE__ */ jsx4(
        "div",
        {
          style: {
            position: "absolute",
            top: "4px",
            left: isActive ? "44px" : "4px",
            width: "32px",
            height: "32px",
            borderRadius: "16px",
            background: "#ffffff",
            transition: "all 0.25s ease"
          }
        }
      )
    }
  );
};
var alpha = (hex, op) => {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return "rgba(" + r + "," + g + "," + b + "," + op + ")";
};

// src/components/PricingCard/PricingCard.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var PricingCard = ({ title = "Starter Plan", price = 19, features = ["Feature 1", "Feature 2", "Feature 3"], accent = "#6366f1", onClick = () => {
} }) => {
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      style: {
        backgroundColor: "#0f172a",
        borderRadius: "20px",
        padding: "32px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
        border: "1px solid rgba(255,255,255,0.08)",
        width: "280px",
        transition: "all 0.25s ease",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden"
      },
      onClick,
      onMouseEnter: (e) => {
        e.currentTarget.style.transform = "translateY(-4px) scale(1.01)";
        e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5)";
      },
      onMouseLeave: (e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.4)";
      },
      children: [
        /* @__PURE__ */ jsx5(
          "h2",
          {
            style: {
              color: "#fff",
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "16px",
              fontFamily: "system-ui, -apple-system, sans-serif"
            },
            children: title
          }
        ),
        /* @__PURE__ */ jsxs4(
          "div",
          {
            style: {
              color: accent,
              fontSize: "48px",
              fontWeight: "700",
              marginBottom: "24px",
              fontFamily: "system-ui, -apple-system, sans-serif"
            },
            children: [
              "$",
              price,
              /* @__PURE__ */ jsx5("span", { style: { fontSize: "16px", color: "rgba(255,255,255,0.6)" }, children: "/mo" })
            ]
          }
        ),
        /* @__PURE__ */ jsx5(
          "ul",
          {
            style: {
              listStyle: "none",
              padding: "0",
              marginBottom: "32px"
            },
            children: features.map((feature, index) => /* @__PURE__ */ jsx5(
              "li",
              {
                style: {
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "14px",
                  padding: "8px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "system-ui, -apple-system, sans-serif"
                },
                children: feature
              },
              index
            ))
          }
        ),
        /* @__PURE__ */ jsx5(
          "button",
          {
            style: {
              backgroundColor: accent,
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "16px 32px",
              fontSize: "16px",
              fontWeight: "600",
              width: "100%",
              cursor: "pointer",
              transition: "all 0.25s ease",
              fontFamily: "system-ui, -apple-system, sans-serif"
            },
            onMouseEnter: (e) => e.currentTarget.style.opacity = "0.9",
            onMouseLeave: (e) => e.currentTarget.style.opacity = "1",
            children: "Get Started"
          }
        )
      ]
    }
  );
};

// src/components/NiceCard/NiceCard.tsx
import { useState as useState4 } from "react";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var NiceCard = ({ title = "Card Title", description = "This is a nice card component.", accent = "#6366f1" }) => {
  const [hovered, setHovered] = useState4(false);
  const alpha2 = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return /* @__PURE__ */ jsxs5(
    "div",
    {
      style: {
        backgroundColor: "#1e293b",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: hovered ? "0 20px 50px " + alpha2(accent, 0.3) : "0 10px 40px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-4px) scale(1.01)" : "none",
        transition: "all 0.25s ease",
        maxWidth: "400px",
        width: "100%"
      },
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      children: [
        /* @__PURE__ */ jsx6("h2", { style: { color: "#ffffff", fontSize: "20px", fontWeight: "600", marginBottom: "12px" }, children: title }),
        /* @__PURE__ */ jsx6("p", { style: { color: "#94a3b8", fontSize: "14px", lineHeight: "1.5" }, children: description })
      ]
    }
  );
};

// src/components/ThemeToggle/ThemeToggle.tsx
import { useState as useState5, useCallback } from "react";
import { jsx as jsx7 } from "react/jsx-runtime";
var ThemeToggle = ({ theme = "dark", onChange = () => {
} }) => {
  const [currentTheme, setCurrentTheme] = useState5(theme);
  const toggleTheme = useCallback(() => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setCurrentTheme(newTheme);
    onChange(newTheme);
  }, [currentTheme, onChange]);
  return /* @__PURE__ */ jsx7(
    "div",
    {
      onClick: toggleTheme,
      style: {
        width: 50,
        height: 28,
        borderRadius: 14,
        backgroundColor: currentTheme === "dark" ? "#020617" : "#ffffff",
        border: "1px solid " + (currentTheme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"),
        position: "relative",
        cursor: "pointer",
        transition: "all 0.25s ease",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      },
      children: /* @__PURE__ */ jsx7(
        "div",
        {
          style: {
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: currentTheme === "dark" ? "#1e293b" : "#f3f4f6",
            position: "absolute",
            top: 2,
            left: currentTheme === "dark" ? 2 : 24,
            transition: "all 0.25s ease"
          }
        }
      )
    }
  );
};
export {
  Card,
  NeonToggleButton,
  NiceCard,
  PricingCard,
  ProductCard,
  ThemeToggle,
  ToastButton
};
