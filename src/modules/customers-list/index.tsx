"use client";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Customer, FetchCustomerParams } from "@/api/customer";
import Button from "@/components/common/button";
import PageHeader from "@/components/common/pageheader";
import PlaceholderWrapper from "@/components/common/placeholder";
import Searchbox from "@/components/common/searchbox";
import CustomerInfoDialog from "@/modules/customer-info";
import { useCustomersList } from "@/queries/customers";
import { isAnonymous } from "@/utils";
import { includeIgnoreCase } from "@/utils/string";

import { Container } from "./css";
import List from "./components/list";

export type CustomersListMode = "ORDER" | "LIST" | "SUSPENDED";
export interface CustomersListProps {
  mode: CustomersListMode;
}
const CustomersList: FC<CustomersListProps> = ({ mode }) => {
  const router = useRouter();

  const customerInfoDialogRef = useRef<CustomerInfoDialog>(null);
  // const promotionDialogRef = useRef(null);

  const [search, setSearch] = useState("");

  const params = useMemo((): FetchCustomerParams => {
    const p: FetchCustomerParams = {
      no_tagged: false,
      with_pending_tank: false,
      with_personal_price: false,
    };
    if (["LIST", "SUSPENDED"].includes(mode)) {
      return {
        ...p,
        active: mode == "LIST",
      };
    }
    return p;
  }, [mode]);

  const filterFromSearch = useCallback(
    (list: Customer[]) => {
      list = list.filter((customer) => {
        const { name, address, customer_code, tel } = customer;
        return (
          includeIgnoreCase(search, name) ||
          includeIgnoreCase(search, address) ||
          includeIgnoreCase(search, customer_code.substring(6)) ||
          includeIgnoreCase(search, tel)
        );
      });
      const isAnonymousIncluded = mode === "ORDER";
      if (isAnonymousIncluded) return list;
      return list.filter((c) => !isAnonymous(c));
    },
    [mode, search]
  );

  const customersProps = useCustomersList(params);
  const {
    customersList,
    refetch: fetchData,
    isValidating: loading,
  } = customersProps;

  const filteredCustomers = useMemo(
    () => filterFromSearch(customersList),
    [customersList, filterFromSearch]
  );

  const handleOpenCustomerInfo = useCallback((id?: number) => {
    customerInfoDialogRef.current?.showDialog(id);
  }, []);

  const handleOpenPromotionDialog = useCallback(() => {
    //TODO
  }, []);

  const isNoData = useMemo(
    () => customersList.length === 0,
    [customersList.length]
  );
  const isResultEmpty = useMemo(
    () => !isNoData && filteredCustomers.length === 0,
    [filteredCustomers.length, isNoData]
  );

  const ButtonsComponent = useMemo(
    () => (
      <div className="buttons-group flex gap-2 items-center">
        {mode === "ORDER" && (
          <Button
            baseProps={{ className: "w-auto min-w-[120px]" }}
            onClick={() => router.push("/orders/")}
          >
            ไปรายการสั่งซื้อ
          </Button>
        )}
        {mode !== "SUSPENDED" && (
          <>
            <Button
              color="yellow"
              baseProps={{ className: "w-auto min-w-[120px]" }}
              onClick={() => handleOpenPromotionDialog()}
            >
              โปรโมชัน
            </Button>
            <Button
              baseProps={{ className: "w-auto min-w-[120px]" }}
              onClick={() => handleOpenCustomerInfo()}
            >
              เพิ่มลูกค้า
            </Button>
          </>
        )}
      </div>
    ),
    [handleOpenCustomerInfo, handleOpenPromotionDialog, mode, router]
  );

  const pageHeaderText = useMemo(() => {
    switch (mode) {
      case "LIST":
        return "การจัดการลูกค้า";
      case "ORDER":
        return "บริการโทรสั่ง";
      case "SUSPENDED":
        return "รายชื่อลูกค้าที่ถูกระงับ";
      default:
        return "การจัดการลูกค้า";
    }
  }, [mode]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container mode={mode}>
      <PageHeader name={pageHeaderText} headerComponent={ButtonsComponent}>
        <div className={clsx("max-w-[250px]", "w-full", "ml-auto")}>
          <Searchbox value={search} onChange={setSearch} />
        </div>
      </PageHeader>

      <PlaceholderWrapper
        isNoData={isNoData}
        isResultEmpty={isResultEmpty}
        noDataPlaceholder="ยังไม่มีรายชื่อลูกค้า"
        resultEmptyPlaceholder="ไม่มีรายชื่อที่ตรงกับการค้นหา"
      >
        <List
          customersList={filteredCustomers}
          mode={mode}
          loading={loading}
          onRefresh={fetchData}
          onOpenInfo={handleOpenCustomerInfo}
        />
        <CustomerInfoDialog ref={customerInfoDialogRef} />
      </PlaceholderWrapper>
    </Container>
  );
};

export default CustomersList;
