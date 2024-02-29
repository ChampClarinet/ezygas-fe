import { FunctionComponent, useMemo } from "react";
import clsx from "clsx";
import {
  Avatar as A,
  AvatarProps as AP,
  AvatarPassThroughOptions,
} from "primereact/avatar";
import { stringToColor } from "@/utils/generator";

export interface AvatarProps {
  imgSrc?: string;
  name?: string;
  size?: "normal" | "large" | "xlarge";
  onClick?: () => unknown;
  pt?: AvatarPassThroughOptions;
}
/**
 * Avatar icon
 */
const Avatar: FunctionComponent<AvatarProps> = ({
  imgSrc,
  name,
  onClick,
  size,
  pt,
}) => {
  const avatarProps = useMemo(() => {
    let props: AP = {
      pt: {
        root: {
          className: "text-white",
          style: {
            backgroundColor: name ? stringToColor(name) : undefined,
          },
        },
        ...pt,
      },
      shape: "circle",
      size,
    };
    if (imgSrc)
      props = {
        ...props,
        image: imgSrc,
      };
    else
      props = {
        ...props,
        label: name?.charAt(0).toUpperCase(),
      };
    return props as any;
  }, [imgSrc, name, pt, size]);
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex",
        "justify-center",
        "items-center",
        "overflow-hidden",
        "select-none",
        "rounded-full",
        onClick != null && "cursor-pointer"
      )}
    >
      <A {...avatarProps} />
    </div>
  );
};

export default Avatar;
