"use client";
import { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import { useBreakpoint } from "@cantabile/hooks";

export interface FormItemProps {
  label: string;
  error?: string;
}
const FormItem: FC<PropsWithChildren<FormItemProps>> = ({
  label,
  error,
  children,
}) => {
  const small = useBreakpoint(576);
  return (
    <div
      className={clsx(
        "form-item",
        "flex",
        "flex-col",

        small
          ? ["flex-[1_0_100%]", "max-w-[240px]"]
          : ["flex-[1_1_48%]", "max-w-[50%]"],
        "gap-1"
      )}
    >
      <span className="text-sm text-gray-1050 mb-2">{label}</span>
      {children}
      <span className={clsx("text-[80%]", "text-cancel", "px-3", "mt-1")}>
        {error || "\u00A0"}
      </span>
    </div>
  );
};

export default FormItem;
