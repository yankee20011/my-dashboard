import React from "react";

const ButtonDelete: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  return (
    <button className="button-delete delete" {...rest}>
      {children}
    </button>
  );
};

export default ButtonDelete;
