// Input component for user input, supporting various types, disabled state, and full width option, styled with Tailwind CSS
import React from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "search" | "email" | "password";
  disabled?: boolean;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = "",
  type = "text",
  disabled = false,
  fullWidth = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  const baseStyles =
  "px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-700 disabled:cursor-not-allowed placeholder-gray-400 caret-white";

  const widthStyles = fullWidth ? "w-full" : "";

  const combinedStyles = `${baseStyles} ${widthStyles}`;

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      className={combinedStyles}
    />
  );
};

export default Input;