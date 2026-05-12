import React, { useState } from "react";

type Props = {
  activeColor?: string;
  inactiveColor?: string;
  initialActive?: boolean;
  onClick?: () => void;
};

export const NeonToggleButton: React.FC<Props> = ({
  activeColor = "#0ea5e9",
  inactiveColor = "#1e293b",
  initialActive = false,
  onClick = () => {},
}) => {
  const [isActive, setIsActive] = useState(initialActive);

  const handleClick = () => {
    setIsActive(!isActive);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: "relative",
        width: "80px",
        height: "40px",
        borderRadius: "20px",
        border: "none",
        cursor: "pointer",
        background: isActive ? activeColor : inactiveColor,
        boxShadow: isActive ? "0 0 10px " + alpha(activeColor, 0.8) : "none",
        transition: "all 0.25s ease",
        outline: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: isActive ? "44px" : "4px",
          width: "32px",
          height: "32px",
          borderRadius: "16px",
          background: "#ffffff",
          transition: "all 0.25s ease",
        }}
      />
    </button>
  );
};

const alpha = (hex: string, op: number) => {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  return "rgba(" + r + "," + g + "," + b + "," + op + ")";
};