"use client";
import { FC, useCallback, useMemo, useRef } from "react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { Image } from "primereact/image";
import { useBreakpoint } from "@cantabile/hooks";
import { MenuResponse } from "@/api/master";
import { useMenuStore } from "@/stores/menu";

import { Sidebar as SidebarComponent, MainMenu, SubMenu } from "./css";

export interface SidebarProps {
  menus: MenuResponse;
}
const Sidebar: FC<SidebarProps> = ({
  menus: { main_menu: menu, sub_menu: subMenu },
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const state = useMenuStore((state) => state.state);
  const updateState = useMenuStore((state) => state.updateState);

  const isMobile = useBreakpoint(768);
  const isSmallDesktop = useBreakpoint(992);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const activeMainMenuIndex = useMemo(() => {
    const url = pathname;
    if (url === "/") return 0;
    const name = url.split("/")[1];
    const index = menu.findIndex(({ url }) => {
      const menuUrlName = url.split("/")[1];
      return menuUrlName === name;
    });
    return index;
  }, [menu, pathname]);

  const activeMainMenu = useMemo(
    () => menu[activeMainMenuIndex],
    [activeMainMenuIndex, menu]
  );

  const indicatorOffset = useMemo(() => {
    const heightPerItem = 110;
    const offset =
      activeMainMenuIndex == -1 ? -10000 : activeMainMenuIndex * heightPerItem;
    return offset;
  }, [activeMainMenuIndex]);

  const activeSubMenuList = useMemo(() => {
    const list = subMenu.find(
      ({ parent_code }) => parent_code == activeMainMenu?.code,
      []
    );
    return list?.items ?? [];
  }, [activeMainMenu?.code, subMenu]);

  const activeSubMenu = useMemo(() => {
    const url = pathname;
    if (url === "/")
      return (
        subMenu
          .find(({ parent_code }) => parent_code === "m-orders")
          ?.items.find(({ code }) => code == "order") ?? null
      );
    const name = url.split("/")[2] ?? null;
    const submenu = activeSubMenuList.find(({ url }) => {
      const submenuUrlName = url.split("/")[2];
      return submenuUrlName === name;
    });
    return submenu ?? null;
  }, [activeSubMenuList, pathname, subMenu]);

  const handleOpenSubmenu = useCallback(() => {
    updateState("SUBMENU");
  }, [updateState]);

  const handleCloseSubmenu = useCallback(() => {
    updateState("MENU");
  }, [updateState]);

  const go = useCallback(
    (url: string) => {
      router.push(url);
      updateState("HIDE");
    },
    [router, updateState]
  );

  return (
    <SidebarComponent ref={sidebarRef}>
      <MainMenu $state={state}>
        <div className={clsx("relative", "flex", "flex-col", "w-full")}>
          {menu.map(({ code, url, icon_src, display_text }, i) => {
            const isActive = i == activeMainMenuIndex;

            const onClick = () => {
              if (isMobile || isSmallDesktop) {
                if (isActive) {
                  if (state != "SUBMENU") return handleOpenSubmenu();
                  else return handleCloseSubmenu();
                }
              }
              if (isActive && state != "SUBMENU") return handleOpenSubmenu();
              return go(url);
            };
            return (
              <div
                onClick={onClick}
                className={clsx(
                  "menu-item",
                  "relative",
                  "w-full",
                  "h-[110px]",
                  "flex justify-center items-center",
                  "flex-col",
                  "text-sm",
                  "border-b",
                  "border-b-solid",
                  "border-b-300",
                  "transition-[color]",
                  "duration-300",
                  "gap-1",
                  "cursor-pointer",
                  "hover:bg-gray-100",
                  isActive && "active"
                )}
                key={code}
              >
                <Image
                  className="h-[30px] w-[35px] flex justify-center items-center"
                  src={icon_src ?? ""}
                  alt={code}
                />
                <span className="text-gray-1100 text-center">{display_text}</span>
              </div>
            );
          })}
          <div
            style={{
              transform: `translateY(${indicatorOffset + 10}px)`,
            }}
            className={clsx(
              "indicator",
              "absolute",
              "left-0",
              "rounded-xl",
              "w-[6px]",
              "h-[90px]",
              "bg-current",
              "transition-[transform]",
              "duration-300"
            )}
          />
        </div>
      </MainMenu>
      <SubMenu $state={state}>
        {activeSubMenuList.map(({ code, display_text, url }) => {
          const isActive = activeSubMenu?.code === code;
          const onClick = () => router.push(url);
          return (
            <div
              onClick={onClick}
              className={clsx(
                "pl-[30px]",
                "py-[10px]",
                "flex",
                "items-center",
                "cursor-pointer",
                "hover:bg-gray-100",
                "transition-[color]",
                "duration-300",
                isActive && "active"
              )}
              key={code}
            >
              <span className={clsx(isActive && "text-current")}>
                {display_text}
              </span>
            </div>
          );
        })}
      </SubMenu>
    </SidebarComponent>
  );
};

export default Sidebar;
