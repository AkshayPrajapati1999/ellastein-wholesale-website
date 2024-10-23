import React, { FC } from "react";

export type Variant = "primary" | "secondary";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: Variant;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...attributes
}) => {
  const getButtonStyles = (variant: Variant) => {
    const baseStyles = "app-btn";

    const variantStyles = {
      primary: `${baseStyles} primary`,
      secondary: `${baseStyles} secondary`,
    };

    return variantStyles[variant || ""] || variantStyles.primary;
  };

  const styles = getButtonStyles(variant);

  return (
    <button type="button" className={styles} {...attributes}>
      {children}
    </button>
  );
};

export default Button;
