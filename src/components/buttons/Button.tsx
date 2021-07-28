import React from "react";

export const Button: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  return <button {...rest}>{children}</button>;
};
