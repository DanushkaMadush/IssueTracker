import React from "react";
import { colors } from "../theme/colors";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.6)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: colors.card,
          padding: "20px",
          borderRadius: "12px",
          width: "420px",
          border: `1px solid ${colors.border}`,
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            color: colors.textMuted,
            cursor: "pointer",
            background: "transparent",
            border: "none",
          }}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;