import React, { useState } from "react";

type Props = {
  title?: string;
  description?: string;
  price?: number;
  image?: string;
  onClick?: () => void;
};

export const ProductCard: React.FC<Props> = ({ title = "Product Title", description = "This is a sample product description.", price = 49.99, image = "https://via.placeholder.com/300", onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        width: "300px",
        borderRadius: "20px",
        backgroundColor: "#1e293b",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: isHovered ? "0 20px 50px rgba(0,0,0,0.5)" : "0 10px 40px rgba(0,0,0,0.4)",
        overflow: "hidden",
        transition: "all 0.25s ease",
        transform: isHovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      />
      <div style={{ padding: "16px" }}>
        <h3 style={{ margin: "0", color: "#f8fafc", fontSize: "20px", fontWeight: "600" }}>{title}</h3>
        <p style={{ margin: "8px 0", color: "#94a3b8", fontSize: "14px" }}>{description}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#6366f1", fontSize: "18px", fontWeight: "700" }}>${price.toFixed(2)}</span>
          <button
            style={{
              backgroundColor: "#6366f1",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "8px 16px",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#7c3aed"}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#6366f1"}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};