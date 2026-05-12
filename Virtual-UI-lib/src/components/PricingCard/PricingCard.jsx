import React from "react";

export const PricingCard = ({ title = "Starter Plan", price = 19, features = ["Feature 1", "Feature 2", "Feature 3"], accent = "#6366f1", onClick = () => {} }) => {
  return (
    <div
      style={{
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
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px) scale(1.01)";
        e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.4)";
      }}
    >
      <h2
        style={{
          color: "#fff",
          fontSize: "24px",
          fontWeight: "600",
          marginBottom: "16px",
          fontFamily: "system-ui, -apple-system, sans-serif"
        }}
      >
        {title}
      </h2>
      <div
        style={{
          color: accent,
          fontSize: "48px",
          fontWeight: "700",
          marginBottom: "24px",
          fontFamily: "system-ui, -apple-system, sans-serif"
        }}
      >
        ${price}<span style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)" }}>/mo</span>
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: "0",
          marginBottom: "32px"
        }}
      >
        {features.map((feature, index) => (
          <li
            key={index}
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "14px",
              padding: "8px 0",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              fontFamily: "system-ui, -apple-system, sans-serif"
            }}
          >
            {feature}
          </li>
        ))}
      </ul>
      <button
        style={{
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
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Get Started
      </button>
    </div>
  );
};