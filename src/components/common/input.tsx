import { FC, useEffect, useRef } from "react";
import { InputText, InputTextProps } from "primereact/inputtext";

export interface InputProps extends InputTextProps {
  focusOnStart?: boolean;
}
const Input: FC<InputProps> = ({ focusOnStart = false, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (focusOnStart) inputRef.current?.focus();
  }, [focusOnStart]);
  return <InputText {...props} ref={inputRef} />;
};

export default Input;
