import React, { useState } from "react";

export const ToastButton = ({ text = "Show Toast", onClick }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 2000);
    if (onClick) onClick();
  };

  return (
    <div style={{
      position: "relative",
      width: "fit-content"
    }}>
      <button
        onClick={handleClick}
        style={{
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
        }}
      >
        {text}
      </button>
      {isActive && (
        <div style={{
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
        }}>
          Message Sent!
        </div>
      )}
    </div>
  );
};