import React, { useState } from "react";
export const NiceCard = ({ title = "Card Title", description = "This is a nice card component.", accent = "#6366f1" }) => {
  const [hovered, setHovered] = useState(false);
  const alpha = (hex, op) => { const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return "rgba("+r+","+g+","+b+","+op+")"; };
  return (
    <div
      style={{
        backgroundColor: "#1e293b",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: hovered ? "0 20px 50px " + alpha(accent, 0.3) : "0 10px 40px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-4px) scale(1.01)" : "none",
        transition: "all 0.25s ease",
        maxWidth: "400px",
        width: "100%"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <h2 style={{ color: "#ffffff", fontSize: "20px", fontWeight: "600", marginBottom: "12px" }}>{title}</h2>
      <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.5" }}>{description}</p>
    </div>
  );
};