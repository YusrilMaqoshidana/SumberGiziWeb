import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, type = "text", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-xs font-semibold text-[#172019] tracking-wide">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={`h-10 px-3 py-2 text-sm bg-white border border-[#DDE3DE] rounded-[8px] text-[#172019] placeholder-[#879088] focus:outline-none focus:ring-2 focus:ring-[#4F7C59] focus:border-[#4F7C59] disabled:bg-[#F1F4F1] disabled:opacity-70 transition-all ${
            error ? "border-[#C94A4A] focus:ring-[#C94A4A]" : ""
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-[#C94A4A] font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
