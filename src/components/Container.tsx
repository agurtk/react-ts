import React from "react";

type Props<T extends React.ElementType> = {
  as?: T;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

const Container = <C extends React.ElementType>({
  as,
  children,
  ...props
}: Props<C>) => {
  const Component = as || "div";
  return <Component {...props}>{children}</Component>;
};

export default Container;
