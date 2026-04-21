import React from "react";
import { colors } from "../theme/colors";

type CardVariant = "default" | "outlined" | "elevated";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = "default",
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    backgroundColor: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: "0.5rem",
    padding: "1rem",
    color: colors.text,
    transition: "all 0.2s ease",
  };

  const variantStyles: Record<CardVariant, React.CSSProperties> = {
    default: {},
    outlined: {
      backgroundColor: "transparent",
    },
    elevated: {
      boxShadow: "0 6px 24px rgba(0,0,0,0.4)",
    },
  };

  return (
    <div
      style={{ ...baseStyle, ...variantStyles[variant] }}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;