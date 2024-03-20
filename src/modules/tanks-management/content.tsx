import { FC, lazy, useCallback, useContext } from "react";
import { useModalState } from "@cantabile/hooks";
import StocksAPI, { Stock } from "@/api/stock";
import Button from "@/components/common/button";
import PageHeader from "@/components/common/pageheader";
import Searchbox from "@/components/common/searchbox";
import Tabs from "@/components/common/tabs";
import { useToastContext } from "@/hooks/toast";
import SweetAlert from "@/utils/sweetalert";

import TanksManagementContext from "./provider";

import AddStockDialog from "./add-stock.dialog";
const OverviewTab = lazy(() => import("./overview.tab"));
const FillTab = lazy(() => import("./fill.tab"));

const Content: FC = () => {
  const context = useContext(TanksManagementContext);
  const { search, setSearch, formProps, stocks } = context;
  const {
    formState: { dirtyFields },
    watch,
  } = formProps!;
  const data = watch();
  const { state, open, close } = useModalState();
  const toast = useToastContext();

  const handleSaveStock = useCallback(async () => {
    const data = watch();
    if (!data) return;
    const payload: Stock[] = [];
    data.items.forEach((item) => {
      const baseStock = stocks.find((s) => s.id == item.id);
      if (!baseStock) return;
      const changed = JSON.stringify(baseStock) != JSON.stringify(item);
      if (changed)
        payload.push({
          ...baseStock,
          quantity: item.full,
          price: item.price,
          price_with_tank: item.pwt,
          price_with_deposit: item.pwd,
          on_site_discount: item.discount,
          emp_qty: item.empty,
        });
    });
    if (!payload.length) return;
    SweetAlert.showLoading();
    const promises = payload.map((p) => StocksAPI.updateStock(p));
    await Promise.all(promises);
    SweetAlert.close();
    toast.showToast({
      severity: "success",
      content: "อัพเดทรายการถังแล้ว",
    });
  }, [stocks, toast, watch]);

  return (
    <div className="flex flex-col h-full gap-3">
      <PageHeader
        name="การจัดการถัง"
        headerComponent={
          <div className="flex items-center gap-4">
            <Button onClick={open}>สร้างสินค้าเพิ่ม</Button>
            <Button onClick={handleSaveStock} color="yellow">
              บันทึกข้อมูล
            </Button>
          </div>
        }
        separator
      >
        <div className="w-[200px]">
          <Searchbox onChange={setSearch} value={search} />
        </div>
      </PageHeader>

      <Tabs
        noBackground
        list={[
          {
            panelProps: {
              header: "ภาพรวมถัง",
            },
            children: <OverviewTab />,
          },
          {
            panelProps: {
              header: "รอการเติมแก๊ส",
            },
            children: <FillTab />,
          },
        ]}
      />

      <AddStockDialog isOpen={state} close={close} />
    </div>
  );
};

export default Content;
