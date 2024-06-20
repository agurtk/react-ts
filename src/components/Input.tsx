import React from "react";

type Props = {
  label: string;
  id: string;
} & React.ComponentPropsWithoutRef<"input">;

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ id, label, ...props }, ref) => {
    return (
      <p>
        <label htmlFor={id}>{label}</label>
        <input id={id} {...props} ref={ref} name={id} />
      </p>
    );
  }
);

export default Input;
