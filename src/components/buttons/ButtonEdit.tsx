import React from "react";

const ButtonEdit: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  return (
    <button className="button-edit" {...rest}>
      {children}
    </button>
  );
};

export default ButtonEdit;
