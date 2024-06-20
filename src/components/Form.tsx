import React from "react";

type Props = React.ComponentPropsWithRef<"form"> & {
  onSave: (value: unknown) => void;
};

export type FormHandle = {
    clear: () => void;
}

const Form = React.forwardRef<FormHandle,Props>(
  ({ onSave, children, ...otherProps }: Props, ref) => {
    const formRef = React.useRef<HTMLFormElement>(null);

    React.useImperativeHandle(ref, ()=> {
        return {
            clear(){
                console.log("CLEARING!");
                
                formRef.current?.reset();
            }
        }
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData);
      onSave(data);
    };

    return (
      <form onSubmit={handleSubmit} {...otherProps} ref={formRef}>
        {children}
      </form>
    );
  }
);

export default Form;
