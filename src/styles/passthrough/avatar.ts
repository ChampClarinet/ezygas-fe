import clsx from "clsx";
import { AvatarPassThroughOptions } from "primereact/avatar";

const avatarPT: AvatarPassThroughOptions = {
  root: ({ props }: any) => {
    switch (props?.size) {
      case "large":
        return clsx("w-16", "h-16", props?.className);
      case "xlarge":
        return clsx("w-24", "h-24", props?.className);
      default:
        return clsx("w-10", "h-10", props?.className);
    }
  },
  label: ({ props }: any) => {
    switch (props?.size) {
      case "large":
        return "text-3xl";
      case "xlarge":
        return "text-5xl";
      default:
        return "text-base";
    }
  },
};

export default avatarPT;
