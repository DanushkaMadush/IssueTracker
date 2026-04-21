import React from "react";
import { colors } from "../theme/colors";

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  ...props
}) => {
  const baseStyle =
    "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border focus:outline-none";

  const variants: Record<ButtonVariant, string> = {
    primary: `
      bg-[${colors.primary}] 
      text-white 
      border-[${colors.primary}]
      hover:opacity-90
      active:scale-95
    `,
    secondary: `
      bg-[${colors.surface}] 
      text-[${colors.text}] 
      border-[${colors.border}]
      hover:bg-[${colors.border}]
    `,
    tertiary: `
      bg-transparent 
      text-[${colors.textMuted}] 
      border-transparent
      hover:text-[${colors.text}]
    `,
  };

  return (
    <button className={`${baseStyle} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
