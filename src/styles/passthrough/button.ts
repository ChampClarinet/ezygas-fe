import clsx from "clsx";
import { ButtonPassThroughOptions } from "primereact/button";

const styles = {
  border: "border-2 border-solid",
  link: clsx("text-blue-900", "bg-transparent", "border-transparent"),
  colors: {
    base: {
      fill: [
        "text-white",
        "bg-current",
        "border-current",
        "hover:bg-blue-800 hover:border-blue-800",
      ],
      outlined: [
        "text-current",
        "bg-transparent",
        "border-current",
        "hover:bg-blue-700/20",
      ],
    },
    success: {
      fill: [
        "text-white",
        "bg-green-600",
        "border-green-600",
        "hover:bg-green-700 hover:border-green-700",
      ],
      outlined: [
        "text-green-600",
        "bg-transparent",
        "border-green-600",
        "hover:bg-green-400/20",
      ],
    },
    danger: {
      fill: [
        "text-white",
        "bg-red-700",
        "border-red-700",
        "hover:bg-red-600 hover:border-red-600",
      ],
      outlined: [
        "text-red-700",
        "bg-transparent",
        "border-red-700",
        "hover:bg-red-500/20",
      ],
    },
    warning: {
      fill: [
        "text-white",
        "bg-yellow-400",
        "border-yellow-400",
        "hover:bg-yellow-500 hover:border-yellow-500",
      ],
      outlined: [
        "text-yellow-400",
        "bg-transparent",
        "border-yellow-400",
        "hover:bg-yellow-200/20",
      ],
    },
  },
};

const getSeverityStyles = (severity: string | undefined, fill?: boolean) => {
  switch (severity) {
    case "success":
      return clsx(
        fill ? styles.colors.success.fill : styles.colors.success.outlined
      );
    case "danger":
      return clsx(
        fill ? styles.colors.danger.fill : styles.colors.danger.outlined
      );
    case "warning":
      return clsx(
        fill ? styles.colors.warning.fill : styles.colors.warning.outlined
      );
    default:
      return clsx(fill ? styles.colors.base.fill : styles.colors.base.outlined);
  }
};

const buttonPT: ButtonPassThroughOptions = {
  root: (options) => {
    const { props = {}, context } = options || {};
    let classes = clsx(
      "items-center justify-center cursor-pointer flex overflow-hidden relative select-none text-center align-bottom gap-2 font-sukhumvit font-bold",
      "transition duration-200 ease-in-out",
      "focus:outline-none focus:outline-offset-0"
    );

    //? Shadow
    if (!props.link) clsx(classes, "shadow-lg");

    //? Border
    if (!props.link && !props.plain) classes = clsx(classes, styles.border);

    if (props.link) classes = clsx(classes, styles.link);
    else {
      const severityStyles = getSeverityStyles(props.severity, !props.outlined);
      classes = clsx(classes, severityStyles);
    }

    //? Sizing
    classes = clsx(
      classes,
      props.size == null && ["px-4", "py-3", "text-base", "w-[140px]"],
      props.size == "small" && ["text-xs", "py-2", "px-3", "w-[100px]"],
      props.size == "large" && ["text-xl", "py-3", "px-4", "w-[160px]"],
      "grow-0",
      "shrink",
      "min-w-fit"
    );

    if (props.iconPos == "top" || props.iconPos == "bottom") {
      classes = clsx(classes, "flex-col");
    }
    if (context?.disabled)
      //? disabled
      classes = clsx(
        classes,
        "opacity-60 saturate-50 pointer-events-none cursor-default"
      );

    return {
      ...props,
      className: clsx(classes, props.className),
    };
  },
  label: (options) => {
    const { props = {} } = options || {};
    return {
      ...props,
      className: clsx(
        "flex-1",
        "duration-200",
        "font-bold",
        props.link && "hover:underline",
        props.label == null && ["invisible", "w-0"]
      ),
    };
  },
  icon: (options) => {
    const { props = {} } = options || {};
    return {
      ...props,
      className: clsx(
        "mx-0",
        props.iconPos == "right" && props.label != null && ["ml-2 order-1"],
        props.iconPos == "bottom" && props.label != null && ["mt-2 order-2"]
      ),
    };
  },
  loadingIcon: (options) => {
    const { props = {} } = options || {};
    return {
      ...props,
      className: clsx(
        "mx-0",
        props.loading &&
          props.iconPos == "left" &&
          props.label != null &&
          "mr-2",
        props.loading &&
          props.iconPos == "right" &&
          props.label != null &&
          "order-1 ml-2",
        props.loading &&
          props.iconPos == "top" &&
          props.label != null &&
          "mb-2",
        props.loading &&
          props.iconPos == "bottom" &&
          props.label != null &&
          "mt-2 order-2"
      ),
    };
  },
  badge: (options) => {
    const { props = {} } = options || {};
    return {
      ...props,
      className: clsx(
        props.badge && [
          "ml-2",
          "w-4",
          "h-4",
          "leading-none",
          "flex",
          "items-center",
          "justify-center",
          "text-white",
          "bg-red-600",
        ]
      ),
    };
  },
};

export default buttonPT;
