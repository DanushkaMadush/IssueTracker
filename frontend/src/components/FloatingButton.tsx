import React from "react";
import { colors } from "../theme/colors";
import { FiPlus } from "react-icons/fi";

interface Props {
  onClick: () => void;
  label?: string;
}

const FloatingButton: React.FC<Props> = ({ onClick, label = "New" }) => {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "60px",
        right: "60px",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: colors.primary,
        color: colors.text,
        border: "none",
        borderRadius: "999px",
        padding: "12px 16px",
        fontSize: "0.9rem",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: `0 6px 20px ${colors.primaryShadow}`,
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = colors.primaryHover;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = colors.primary;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <FiPlus size={18} />
      {label}
    </button>
  );
};

export default FloatingButton;