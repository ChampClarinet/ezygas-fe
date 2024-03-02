"use client";
import { FC } from "react";
import clsx from "clsx";
import { useBreakpoint } from "@cantabile/hooks";
import { Image } from "primereact/image";
import { useCheckMobileSize } from "@/hooks/layout";
import { LP } from "@/constants/external.link";
import { Appbar } from "./css";

import Hamburger from "./hamburger";
import MenuGroup from "./menu-group";

import useGlobalStore from "@/stores/global";

const Navbar: FC = () => {
  const isBelow700 = useBreakpoint(700);
  const isMobile = useCheckMobileSize();

  const myVendor = useGlobalStore((state) => state.myVendor);

  return (
    <Appbar className="navbar shadow-xl">
      <div className="w-full px-6 relative flex justify-between items-center">
        <div className="flex h-full gap-4 items-center">
          <Hamburger />
          {!isBelow700 && (
            <b className="text-gray-1100">
              รหัสร้านค้า: {myVendor?.vendor_code}
            </b>
          )}
        </div>

        <div
          className={clsx(
            "center",
            "absolute",
            "right-0",
            "left-0",
            "mx-auto",
            "w-fit"
          )}
        >
          {isBelow700 ? (
            <b className="text-gray-1100">ร้าน: {myVendor?.vendor_code}</b>
          ) : (
            <Image
              src="/assets/img/ezygas-logo-w-text.svg"
              alt="ezygas"
              className={clsx("cursor-pointer")}
              height="35"
              width={isMobile ? "80" : "110"}
              onClick={() => window.open(LP, "_self")}
            />
          )}
        </div>

        <MenuGroup />
      </div>
    </Appbar>
  );
};

export default Navbar;
