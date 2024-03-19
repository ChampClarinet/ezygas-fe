"use client";
import { FC, useCallback } from "react";
import { Stock } from "@/api/stock";
import { DataView } from "primereact/dataview";

const mockData: Stock = {
  id: 1,
  cylinder_brand: "PTT",
  cylinder_type: "Picnic",
  brand_text: "ปตท",
  type_text: "ปิคนิค",
  brand_code: "ptt",
  type_code: 4,
  quantity: 8,
  price: 100,
  price_with_tank: 1000,
  price_with_deposit: 110,
  emp_qty: 1,
  filling_qty: 3,
  is_active: true,
  on_site_discount: 10,
};

const mockDataList = [...new Array(10)].map((_, i) => ({ ...mockData, id: i }));

const TanksManagementModule: FC = () => {
  const editableStocks: EditableStock[] = mockDataList
    .filter((s) => s.is_active)
    .map((stock) => ({
      ...stock,
      brand: stock.brand_text,
      type: stock.type_text,
    }));
  const template = useCallback((stock: EditableStock) => {
    const {} = stock;
    return <></>;
  }, []);
  return (
    <div>
      <DataView value={editableStocks} layout="grid" itemTemplate={template} />
    </div>
  );
};

export default TanksManagementModule;

export interface EditableStock {
  id: number;
  brand_code: string;
  type_code: string | number;
  brand: string;
  type: string;
  quantity: number;
  price: number;
  price_with_tank: number;
  price_with_deposit: number;
  on_site_discount: number;
  emp_qty: number;
  filling_qty: number;
  is_active: boolean;
  edited?: boolean;
}
