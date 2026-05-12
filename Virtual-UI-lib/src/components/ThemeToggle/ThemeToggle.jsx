import React, { useState, useCallback } from "react";

export const ThemeToggle = ({ theme = "dark", onChange = () => {} }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  const toggleTheme = useCallback(() => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setCurrentTheme(newTheme);
    onChange(newTheme);
  }, [currentTheme, onChange]);

  return (
    <div
      onClick={toggleTheme}
      style={{
        width: 50,
        height: 28,
        borderRadius: 14,
        backgroundColor: currentTheme === "dark" ? "#020617" : "#ffffff",
        border: "1px solid " + (currentTheme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"),
        position: "relative",
        cursor: "pointer",
        transition: "all 0.25s ease",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: currentTheme === "dark" ? "#1e293b" : "#f3f4f6",
          position: "absolute",
          top: 2,
          left: currentTheme === "dark" ? 2 : 24,
          transition: "all 0.25s ease"
        }}
      />
    </div>
  );
};