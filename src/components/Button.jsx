import React from "react";

const variantsStyle = {
  solid: "bg-purple-600 text-white border-purple-600",
  outline: "bg-white text-purple-600 border-current",
};

function Button({ children, variant = "solid", className, ...props }) {
  return (
    <button
      className={`rounded border px-4 py-1 ${variantsStyle[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
