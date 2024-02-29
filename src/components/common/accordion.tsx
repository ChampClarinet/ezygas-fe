import { FC } from "react";
import { AccordionProps, Accordion as Ac } from "primereact/accordion";

const Accordion: FC<AccordionProps> = (props) => {
  return <Ac {...props}></Ac>;
};

export default Accordion;