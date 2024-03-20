"use client";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import DateHelper from "@cantabile/date-helper";
import { useBreakpoint } from "@cantabile/hooks";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Badge } from "primereact/badge";
import { Image } from "primereact/image";
import Loading from "@/components/common/loading";
import PlaceholderWrapper from "@/components/common/placeholder";
import { useFillsList } from "@/queries/fill";
import { sumField, toDisplayNumber } from "@/utils/numbers";

import SideButton from "../side.button";
import FinishFill from "./finish";

const FillTab: FC = () => {
  const { fillsList, refetch, isLoading, isValidating } = useFillsList();

  const isSmall = useBreakpoint(700);

  const hidePicture = useBreakpoint(300);

  const [currentTab, setCurrentTab] = useState<number | null>(null);

  const openModal = useCallback(() => {}, []);

  const fillItem = useMemo(() => {
    if (currentTab == null) return null;
    return fillsList[currentTab] || null;
  }, [currentTab, fillsList]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={clsx(
        "tab-fill",
        "flex",
        "relative",
        "max-w-full",
        "justify-evenly",
        "items-start"
      )}
    >
      <Loading isLoading={isLoading || isValidating}>
        <PlaceholderWrapper isNoData={fillsList.length <= 0}>
          <>
            <div
              className={clsx(
                "refills-list",
                "flex",
                "flex-col",
                isSmall ? ["w-full"] : "w-[400px]",
                "flex-shrink",
                "h-full"
              )}
            >
              <Accordion
                activeIndex={currentTab}
                onTabChange={(t) =>
                  setCurrentTab(Array.isArray(t.index) ? t.index[0] : t.index)
                }
              >
                {fillsList.map((f) => {
                  const date = new DateHelper(f.updatedAt, {
                    useBD: true,
                    useShortText: true,
                    showSeconds: true,
                    lang: "th",
                  });
                  const label = `${date.getDisplayDate()}, ${date.getDisplayTime()} น.`;
                  const count = sumField(f.filling, "quantity");
                  return (
                    <AccordionTab
                      key={f.id}
                      header={
                        <div className="flex items-center gap-2 w-full justify-between">
                          <span className="text-current font-bold">
                            {label}
                          </span>
                          <Badge
                            value={count}
                            pt={{
                              root: { className: "bg-yellow-400 font-bold" },
                            }}
                          />
                        </div>
                      }
                      pt={{
                        headerAction: {
                          className: clsx(
                            "bg-white",
                            "shadow-lg",
                            "rounded-xl"
                          ),
                        },
                        headerIcon: {
                          className: "text-current",
                        },
                        root: {
                          className: clsx(
                            "border",
                            "border-solid",
                            "border-gray-300",
                            "rounded-xl",
                            "shadow-md",
                            "mb-3"
                          ),
                        },
                        content: {
                          className: clsx(
                            "rounded-xl",
                            "bg-white",
                            "flex",
                            "flex-col",
                            "gap-2"
                          ),
                        },
                      }}
                    >
                      {f.filling.map((fd) => {
                        const imgPath = `/assets/img/tanks/${fd.stock.brand_code}-${fd.stock.type_code}.png`;
                        const stockName = `${fd.stock.brand_text} ${fd.stock.type_text}`;
                        return (
                          <div className="each-item flex gap-3" key={fd.id}>
                            <Image
                              src={imgPath}
                              alt={stockName}
                              className={clsx(
                                "object-contain",
                                "rounded-md",
                                "flex",
                                "items-center",
                                "justify-center",
                                hidePicture
                                  ? ["w-0", "border-none"]
                                  : [
                                      "w-[30%]",
                                      "border",
                                      "border-solid",
                                      "border-gray-300",
                                    ],
                                "transition-all",
                                "duration-300"
                              )}
                            />
                            <div
                              className={clsx(
                                "details-group",
                                "flex",
                                "flex-col",
                                "flex-grow",
                                "justify-center",
                                "gap-2"
                              )}
                            >
                              <span className="text-start">{stockName}</span>
                              <div className="flex gap-2 items-center">
                                <span className="label text-current text-center">
                                  ส่งเติม:
                                </span>
                                <span className="quantity text-gray-1000">
                                  {toDisplayNumber(fd.quantity)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </AccordionTab>
                  );
                })}
              </Accordion>
            </div>
            <SideButton
              onClick={openModal}
              show={isSmall && currentTab != null}
            />
            {!isSmall && (
              <div
                className={clsx(
                  "refill-details",
                  "flex",
                  "flex-col",
                  "flex-grow",
                  "ml-[.8rem]",
                  "max-w-[50%]",
                  "p-4",
                  "bg-white"
                )}
              >
                <FinishFill item={fillItem} />
              </div>
            )}
            {/* <FinishFillModal
              fillItem={fillItem}
              onFinishFill={onFinishFill}
              isOpen={modalOpen}
              toggle={toggle}
            /> */}
          </>
        </PlaceholderWrapper>
      </Loading>
    </div>
  );
};

export default FillTab;
