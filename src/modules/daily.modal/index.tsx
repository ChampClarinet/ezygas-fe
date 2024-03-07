import { FC, useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import DateHelper from "@cantabile/date-helper";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import StocksAPI, { Stock } from "@/api/stock";
import Button from "@/components/common/button";
import Loading from "@/components/common/loading";
import NumericInput from "@/components/common/numericinput";
import PlaceholderWrapper from "@/components/common/placeholder";
import Searchbox from "@/components/common/searchbox";
import { useToastContext } from "@/hooks/toast";
import { useStocksList } from "@/queries/stocks";
import { useSettingsStore } from "@/stores/settings";
import { filterStocksBySearch } from "@/utils/stocks";
import SweetAlert from "@/utils/sweetalert";
import { resolveErrorResponse } from "@/utils/error";

export interface EditableDailyStock {
  id: number;
  price: string;
  oldPrice: number;
}
interface DialyReviewProps {
  isFirstTimeOpen: boolean;
  isOpen: boolean;
  closeModal: () => unknown;
}
const DailyReviewModal: FC<DialyReviewProps> = (props) => {
  const toast = useToastContext();
  const { isOpen, closeModal } = props;

  const [editedStocks, setEditedStock] = useState<EditableDailyStock[]>([]);
  const [search, setSearch] = useState("");
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);

  const useStocksProps = useStocksList({
    activeOnly: true,
    onStockChanges: (stocks) => {
      setEditedStock(
        stocks.map(({ id, price }) => ({
          id,
          price: "" + price,
          oldPrice: price,
        }))
      );
    },
  });

  const { stocksList, refetch: reloadStocks } = useStocksProps;

  const isReady = useMemo(
    () => !useStocksProps.isLoading, //&& !useEmpProps.isFetching
    [
      // useEmpProps.isFetching,
      useStocksProps.isLoading,
    ]
  );

  const isError = useMemo(
    () => useStocksProps.error, // || useEmpProps.isError,
    [
      // useEmpProps.isError,
      useStocksProps.error,
    ]
  );

  const handleUpdateStock = useCallback(
    async (stock: Stock) => {
      SweetAlert.showLoading();
      try {
        await StocksAPI.updateStock(stock);
        SweetAlert.close();
        toast.showToast({ content: "อัพเดทข้อมูลสำเร็จ", severity: "success" });
        reloadStocks();
        return;
      } catch (error) {
        SweetAlert.close();
        resolveErrorResponse(error);
      }
    },
    [reloadStocks, toast]
  );

  const handleFetchData = useCallback(
    async () =>
      await Promise.all([
        // reloadEmployees(),
        reloadStocks(),
      ]),
    [
      // reloadEmployees,
      reloadStocks,
    ]
  );

  const setLastReview = useSettingsStore((state) => state.setLastReview);
  const updateLastReviewToStore = useCallback(() => {
    const mDate = new DateHelper();
    const last_review = mDate.toISO8601String();
    setLastReview(last_review);
  }, [setLastReview]);

  const close = useCallback(() => {
    updateLastReviewToStore();
    closeModal();
  }, [closeModal, updateLastReviewToStore]);

  const handlePriceChange = useCallback(
    (targetId: number, changeTo: string) => {
      const data = [...editedStocks];
      const st = data.find((s) => s.id == targetId);
      if (st) {
        if (changeTo === "") st.price = "";
        else if (+changeTo > 0) st.price = changeTo;
        else st.price = "0";
      }
      setEditedStock([...data]);
    },
    [editedStocks]
  );

  const mapDataAndUpdate = useCallback(() => {
    editedStocks.forEach((es) => {
      const isPriceChangedAndNewPriceIsValid =
        !isNaN(+es.price) && es.price !== "" && +es.price != es.oldPrice;
      if (isPriceChangedAndNewPriceIsValid) {
        const price = +es.price;
        const st = stocksList.find((s) => s.id === es.id);
        if (st) handleUpdateStock({ ...st, price });
      }
    });
    close();
  }, [close, editedStocks, handleUpdateStock, stocksList]);

  useEffect(() => {
    const filtered = stocksList.filter((stock) =>
      filterStocksBySearch(stock, search)
    );
    setFilteredStocks(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedStocks, search]);

  useEffect(() => {
    if (isOpen) {
      handleFetchData();
    } else mapDataAndUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);
  return (
    <Dialog
      visible={isOpen}
      onHide={close}
      dismissableMask
      draggable={false}
      modal
      showHeader={false}
      pt={{
        root: { className: "w-full h-[85vh]" },
        content: { className: "pt-6" },
      }}
    >
      {/* <div className="employee-part"></div>
      <div className="separator" /> */}
      <div className="stocks">
        <h1 className="pb-2.5 mb-2 text-2xl font-bold">ราคาแก๊สวันนี้</h1>

        <div className={clsx("max-w-[300px]", "mb-4")}>
          <Searchbox value={search} onChange={setSearch} />
        </div>
        <div className="stocks-list flex flex-wrap relative justify-center xs:justify-start">
          <Loading isLoading={!isReady} isError={isError}>
            <PlaceholderWrapper
              noDataPlaceholder="ไม่มีข้อมูลรายการถังแก๊ส"
              isNoData={stocksList.length <= 0}
            >
              {filteredStocks.map((stock) => {
                const eds = editedStocks.find((ed) => ed.id == stock.id);
                const newPrice = eds ? eds.price : "";
                const { brand_code, type_code, brand_text, type_text, id } =
                  stock;
                const name = `${brand_text} ${type_text}`;
                return (
                  <div
                    className={clsx(
                      "stock-item",
                      "flex",
                      "flex-col",
                      "h-fit",
                      "shadow-none",
                      "p-2",
                      "m-1",
                      "rounded",
                      "bg-white",
                      "border-none"
                    )}
                    key={stock.id}
                  >
                    <Image
                      src={`/assets/img/tanks/${brand_code}-${type_code}.png`}
                      alt={name}
                      height="125px"
                      width="125px"
                      pt={{
                        root: { className: "flex justify-center" },
                      }}
                    />
                    <div
                      className={clsx(
                        "details",
                        "flex",
                        "flex-col",
                        "mb-4",
                        "gap-2"
                      )}
                    >
                      <label
                        className={clsx(
                          "text-black",
                          "text-base",
                          "text-center",
                          "font-bold"
                        )}
                      >
                        {name}
                      </label>
                      <div
                        className={clsx(
                          "quantity-group",
                          "flex",
                          "items-center",
                          "justify-center",
                          "gap-2"
                        )}
                      >
                        <span>ราคา</span>
                        <NumericInput
                          currency="THB"
                          mode="currency"
                          locale="th"
                          min={0}
                          maxFractionDigits={0}
                          className={clsx("quantity-input", "text-right")}
                          pt={{
                            input: {
                              root: {
                                className: clsx("!px-2", "!py-0", "w-[80px]"),
                              },
                            },
                          }}
                          value={+newPrice}
                          onChange={(e) =>
                            handlePriceChange(id, (e.value || 0) + "")
                          }
                        />
                        <span>บาท</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </PlaceholderWrapper>
          </Loading>
        </div>
      </div>
      <div className="w-full items-center justify-center flex">
        <Button
          onClick={mapDataAndUpdate}
          baseProps={{ className: "px-12 w-[140px]" }}
        >
          ตกลง
        </Button>
      </div>
    </Dialog>
  );
};

export default DailyReviewModal;
