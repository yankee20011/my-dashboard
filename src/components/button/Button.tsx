import React from "react";

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> =
  ({ children, ...rest }) => {
    return <button {...rest}>{children}</button>;
  };
