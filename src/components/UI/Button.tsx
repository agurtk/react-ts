import React from "react";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
    href?: never;
};

type LinkProps = React.ComponentPropsWithoutRef<"a"> & {
    href?: string;
};

const isLinkProps = (props: ButtonProps | LinkProps): props is LinkProps => {
    return "href" in props;
} 

const Button = (props: ButtonProps | LinkProps) => {
  if (isLinkProps(props)) {
    return <a className="button" {...props}></a>;
  }
  return <button className="button" {...props}></button>;
};

export default Button;
