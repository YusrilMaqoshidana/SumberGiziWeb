import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F7C59] disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variantStyles = {
      primary: "bg-[#4F7C59] text-white hover:bg-[#416749] active:bg-[#35533B]",
      secondary:
        "bg-white text-[#172019] border border-[#DDE3DE] hover:bg-[#F1F4F1] active:bg-[#E5EEE6]",
      destructive:
        "bg-[#C94A4A] text-white hover:bg-[#B33E3E] active:bg-[#993434]",
      ghost: "bg-transparent text-[#4F7C59] hover:bg-[#F3F7F3] active:bg-[#E5EEE6]",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-11 px-6 text-base gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
