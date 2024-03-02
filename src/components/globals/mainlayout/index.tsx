"use client";
import { FC, PropsWithChildren } from "react";
import { WithServerData } from "@/app/(auth)/layout";
import { useListen } from "@/hooks";
import useGlobalStore from "@/stores/global";
import { useMenuStore } from "@/stores/menu";
import { Main } from "./css";

import Navbar from "./navbar";
import Sidebar from "./sidebar";

export interface MainLayoutProps extends WithServerData, PropsWithChildren {}
const MainLayout: FC<MainLayoutProps> = (props) => {
  const { children, myVendor, user, menus } = props;

  const setUser = useGlobalStore((state) => state.setUser);
  const setMyVendor = useGlobalStore((state) => state.setMyVendor);

  useListen(user, setUser);
  useListen(myVendor, setMyVendor);

  const state = useMenuStore((state) => state.state);
  return (
    <div className="main-layout flex flex-col min-h-screen w-full">
      <Navbar />
      <Sidebar menus={menus} />
      <Main state={state}>{children}</Main>
    </div>
  );
};

export default MainLayout;
