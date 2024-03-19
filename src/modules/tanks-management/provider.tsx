"use client";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { useStocksList } from "@/queries/stocks";
import { Nullable } from "@/types/general";
import { Stock } from "@/api/stock";

export enum Tab {
  OVERVIEW = "overview",
  FILL = "fill",
}

export interface StockForm {
  items: FormStockItem[];
  toFill: ToFill[];
}

export interface ToFill {
  id: number;
  quantity: number;
}

export interface FormStockItem {
  id: number;
  full: number;
  empty: number;
  price: number;
  /**
   * Price with tank
   */
  pwt: number;
  /**
   * Price with deposit
   */
  pwd: number;
  /**
   * On site discount
   */
  discount: number;
}

export interface TanksManagementContextType {
  tab: Tab;
  setTab: (tab: Tab) => unknown;
  stocksQuery: Nullable<ReturnType<typeof useStocksList>>;
  search: string;
  setSearch: (search: string) => unknown;
  stocks: Stock[];
  formProps: Nullable<UseFormReturn<StockForm>>;
}

const TanksManagementContext = createContext<TanksManagementContextType>({
  tab: Tab.OVERVIEW,
  setTab: () => {},
  stocksQuery: null,
  search: "",
  setSearch: () => {},
  formProps: null,
  stocks: [],
});

export const TanksManagementProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [tab, setTab] = useState(Tab.OVERVIEW);
  const formProps = useForm<StockForm>({
    defaultValues: { items: [], toFill: [] },
  });

  const [search, setSearch] = useState("");
  const [stocks, setStocks] = useState<Stock[]>([]);

  const stocksQuery = useStocksList({
    activeOnly: true,
    onStockChanges: setStocks,
  });

  const filter = useCallback(() => {
    return stocks.filter(
      ({
        brand_code,
        brand_text,
        type_code,
        type_text,
        emp_qty,
        on_site_discount,
        quantity,
        price,
        price_with_deposit,
        price_with_tank,
      }) => {
        const toSearch = [
          brand_code,
          brand_text,
          type_code,
          type_text,
          emp_qty,
          on_site_discount,
          quantity,
          price,
          price_with_deposit,
          price_with_tank,
        ];

        return toSearch.some((value) => {
          const text = typeof value === "string" ? value : value.toString();
          return text.toLowerCase().includes(search.toLowerCase().trim());
        });
      }
    );
  }, [stocks, search]);

  useEffect(() => {
    const filtered = filter();
    formProps.reset({
      items: filtered.map((stock) => ({
        id: stock.id,
        discount: stock.on_site_discount,
        empty: stock.emp_qty,
        full: stock.quantity,
        price: stock.price,
        pwt: stock.price_with_tank,
        pwd: stock.price_with_deposit,
      })),
      toFill: [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    stocksQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <TanksManagementContext.Provider
      value={{
        tab,
        setTab,
        stocksQuery,
        search,
        setSearch,
        stocks,
        formProps,
      }}
    >
      {children}
    </TanksManagementContext.Provider>
  );
};

export default TanksManagementContext;
