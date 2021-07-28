interface ButtonProps {
  disabled?: boolean;
}

const ButtonEdit: React.FC<
  ButtonProps & React.HTMLAttributes<HTMLButtonElement>
> = ({ children, ...rest }) => {
  return (
    <button className="button-edit edit" {...rest}>
      {children}
    </button>
  );
};

export default ButtonEdit;
