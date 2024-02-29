import { FC } from "react";
import { InputTextareaProps, InputTextarea } from "primereact/inputtextarea";

export interface TextareaProps extends InputTextareaProps {}
const Textarea: FC<TextareaProps> = (props) => {
  return <InputTextarea {...props} />;
};

export default Textarea;