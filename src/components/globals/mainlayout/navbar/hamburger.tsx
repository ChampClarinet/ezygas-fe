"use client";
import { FC, useCallback, useEffect } from "react";
import clsx from "clsx";
import { useBreakpoint } from "@cantabile/hooks";
import { useMenuStore } from "@/stores/menu";
import { useCheckMobileSize } from "@/hooks/layout";

const Hamburger: FC = () => {
  const state = useMenuStore((state) => state.state);
  const prevState = useMenuStore((state) => state.prevState);
  const updateState = useMenuStore((state) => state.updateState);

  const isMobile = useCheckMobileSize();
  const isSmallDesktop = useBreakpoint(992);

  const handleToggleSidebar = useCallback(() => {
    switch (state) {
      case "HIDE":
        return updateState("MENU");
      case "MENU":
        return updateState(
          isMobile ? "HIDE" : prevState === "SUBMENU" ? "HIDE" : "SUBMENU"
        );
      case "SUBMENU":
        return updateState(isMobile ? "HIDE" : "MENU");
      default:
        return;
    }
  }, [isMobile, prevState, state, updateState]);

  useEffect(() => {
    if (isMobile) updateState("HIDE");
    else if (isSmallDesktop) updateState("MENU");
    else updateState("SUBMENU");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, isSmallDesktop]);

  return isMobile ? (
    <i
      onClick={handleToggleSidebar}
      className="pi pi-bars hamburger text-gray-600"
    />
  ) : (
    <div className="w-[120px] h-full flex justify-center items-center ml-[-1.5rem]">
      <div
        onClick={handleToggleSidebar}
        className="hamburger cursor-pointer flex justify-center items-center"
      >
        <svg
          className={clsx(
            "h-3",
            "w-2",
            "transition-colors",
            "duration-300",
            "text-gray-1100",
            !["MENU", "SUBMENU"].includes(state) && "opacity-50"
          )}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 9 17"
        >
          <rect x="0.48" y="0.5" width="7" height="1" />
          <rect x="0.48" y="7.5" width="7" height="1" />
          <rect x="0.48" y="15.5" width="7" height="1" />
        </svg>

        <svg
          className={clsx(
            "h-3",
            "w-3",
            "transition-colors",
            "duration-300",
            "text-gray-1100",
            state !== "SUBMENU" && "opacity-50"
          )}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 17"
        >
          <rect x="1.56" y="0.5" width="16" height="1" />
          <rect x="1.56" y="7.5" width="16" height="1" />
          <rect x="1.56" y="15.5" width="16" height="1" />
        </svg>
      </div>
    </div>
  );
};

export default Hamburger;
