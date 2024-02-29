import { FC, MouseEventHandler, useMemo } from "react";
import { Button as BaseButton, ButtonProps as BP } from "primereact/button";

export interface ButtonProps {
  link?: boolean;
  fill?: boolean;
  color?: "yellow" | "red" | "green" | "blue";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  baseProps?: BP;
  children?: string;
}
const Button: FC<ButtonProps> = ({ children, baseProps, ...props }) => {
  const { fill = false, color = "blue", link, onClick, disabled } = props;
  const outlined = useMemo(() => (fill ? false : true), [fill]);
  const severity = useMemo(() => {
    switch (color) {
      case "green":
        return "success";
      case "red":
        return "danger";
      case "yellow":
        return "warning";
      default:
        return undefined;
    }
  }, [color]);
  return (
    <BaseButton
      link={link}
      outlined={outlined}
      severity={severity}
      onClick={onClick}
      disabled={disabled}
      rounded
      label={children}
      {...baseProps}
    ></BaseButton>
  );
};

export default Button;
