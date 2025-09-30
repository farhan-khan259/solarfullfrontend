// src/admin/components/Card.jsx
import React from "react";
import "../styles/cards.css";

const Card = ({ title, value, color = "#ffffff", textColor = "#1e1e2d" }) => {
  return (
    <div
      className="card-box"
      style={{ backgroundColor: color, color: textColor }}
    >
      <h3 style={{ color: textColor }}>{title}</h3>
      <p style={{ color: textColor }}>{value}</p>
    </div>
  );
};

export default Card;
