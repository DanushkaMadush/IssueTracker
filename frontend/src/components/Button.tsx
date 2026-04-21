import React, { useState } from "react";
import { colors } from "../theme/colors";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  disabled,
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const baseStyle: React.CSSProperties = {
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    border: "none",
    outline: "none",
    opacity: disabled ? 0.6 : 1,
  };

  const variants: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: isHovered ? colors.primaryHover : colors.primary,
      color: colors.text,
      border: `1px solid ${colors.primary}`,
      boxShadow: isHovered ? `0 4px 12px ${colors.primaryShadow}` : "none",
      transform: isActive ? "scale(0.97)" : "scale(1)",
    },

    secondary: {
      backgroundColor: isHovered ? colors.border : colors.surface,
      color: colors.text,
      border: `1px solid ${colors.border}`,
      transform: isActive ? "scale(0.97)" : "scale(1)",
    },

    tertiary: {
      backgroundColor: "transparent",
      color: isHovered ? colors.text : colors.textMuted,
      border: "1px solid transparent",
      transform: isActive ? "scale(0.97)" : "scale(1)",
    },
  };

  return (
    <button
      style={{ ...baseStyle, ...variants[variant], ...style }}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;