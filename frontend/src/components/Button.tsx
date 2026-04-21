import React from "react";

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
    "px-4 py-2 rounded-md text-sm font-medium transition border";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-black text-white border-black",
    secondary: "bg-white text-black border-black",
    tertiary: "bg-transparent text-black border-transparent",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;