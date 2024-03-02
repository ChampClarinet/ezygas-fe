import {
  FC,
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Image } from "primereact/image";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { useBreakpoint, useModalState } from "@cantabile/hooks";
import Avatar from "@/components/common/avatar";
import { LP } from "@/constants/external.link";
import useGlobalStore from "@/stores/global";
import { useSettingsStore } from "@/stores/settings";
import { logout } from "@/utils/auth";
import { resolveErrorResponse } from "@/utils/error";
import Zoomer from "./zoomer";
// import FixCostDialog from "@/modules/FixCost";
// import DialyReviewDialog from "@/components/fragments/daily.modal";
// import { shouldShowDailyStockReviewModal } from "@/utils/schedule";

import Button from "@/components/common/button";

const MenuGroup: FC = () => {
  const router = useRouter();
  const user = useGlobalStore((state) => state.user);
  const vendor = useGlobalStore((state) => state.myVendor);

  const latestReview = useSettingsStore((state) => state.latestReview);

  const avatarRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<Menu>(null);

  const hideButtons = useBreakpoint(920);
  const hideName = useBreakpoint(700);

  const [fixCostDialog, setFixCostDialog] = useState(false);
  const handleToggleFixCostDialog = useCallback(() => {
    setFixCostDialog((prev) => !prev);
  }, []);

  const {
    open: handleOpenDailyDialog,
    close: handleCloseDailyDialog,
    state: dailyState,
  } = useModalState();

  const handleLogout = useCallback(() => {
    try {
      logout().then(() => router.push("/login"));
    } catch (error) {
      console.error(error);
      resolveErrorResponse(error);
    }
  }, [router]);

  const handleOpenContextMenu = useCallback((e: SyntheticEvent) => {
    menuRef.current?.toggle(e);
  }, []);

  const menuItems = useMemo(
    (): MenuItem[] => [
      {
        label: "การจัดการ",
        items: [
          {
            label: "การจัดการร้าน",
            command: () => router.push("/users/store"),
            icon: (
              <Image
                src="/assets/icons/store.svg"
                className="mr-1 w-4 h-4"
                alt="store"
              />
            ),
          },
          {
            label: "กิจวัตรตอนเช้า",
            command: handleOpenDailyDialog,
            icon: "pi pi-shopping-bag",
          },
          {
            label: "เพิ่มรายจ่าย",
            command: handleToggleFixCostDialog,
            icon: "pi pi-pencil",
          },
        ],
      },
      { separator: true },
      {
        label: "ลิงก์",
        items: [
          {
            label: "หน้าแรก",
            command: () => window.open(LP, "_self"),
            icon: "pi pi-home",
          },
          {
            label: "ออกจากระบบ",
            command: handleLogout,
            icon: "pi pi-sign-out",
          },
        ],
      },
      { separator: true },
      {
        template: <Zoomer />,
      },
    ],
    [handleLogout, handleOpenDailyDialog, handleToggleFixCostDialog, router]
  );

  return (
    <div className="flex h-full gap-4 items-center">
      {/* <FixCostDialog
        isOpen={fixCostDialog}
        onToggle={handleToggleFixCostDialog}
      />
      <DialyReviewDialog
        isOpen={dailyState}
        closeModal={handleCloseDailyDialog}
        isFirstTimeOpen={shouldShowDailyStockReviewModal(
          vendor?.last_login || null,
          latestReview
        )}
      /> */}
      <div
        className={clsx(
          "buttons",
          "flex",
          "gap-2",
          "items-center",
          "overflow-hidden",
          "transition-[width]",
          "duration-300",
          hideButtons && "w-0"
        )}
      >
        <Button color="yellow" onClick={handleOpenDailyDialog}>
          กิจวัตรตอนเช้า
        </Button>
        <Button color="red" onClick={handleToggleFixCostDialog}>
          เพิ่มรายจ่าย
        </Button>
      </div>

      <div
        ref={avatarRef}
        onClick={handleOpenContextMenu}
        className="flex justify-between items-center gap-4 cursor-pointer"
      >
        {!hideName && <span className="text-title">{user?.first_name}</span>}
        <Avatar name={user?.first_name} />
      </div>

      <Menu model={menuItems} popup ref={menuRef} />
    </div>
  );
};

export default MenuGroup;
