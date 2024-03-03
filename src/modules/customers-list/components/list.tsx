import { FC, useCallback, useRef } from "react";
import CustomerAPI, { Customer } from "@/api/customer";
import { CustomersListMode } from "..";
import { DataTable } from "primereact/datatable";
import { Column, ColumnProps } from "primereact/column";
import { isAnonymous } from "@/utils";
import { resolveErrorResponse } from "@/utils/error";
import { nullifyEmptyStrings } from "@/utils/object";
import SweetAlert from "@/utils/sweetalert";

import Buttons from "./buttons";
import BanDialog from "./ban.dialog";

interface ListProps {
  mode: CustomersListMode;
  loading: boolean;
  onOpenInfo: (targetId: number) => unknown;
  onRefresh: () => unknown;
  customersList: Customer[];
}
const List: FC<ListProps> = (props) => {
  const { mode, onOpenInfo, onRefresh, customersList, loading } = props;

  const banReasonDialogRef = useRef<BanDialog>(null);

  const findById = useCallback(
    (id: number) => {
      const customer = customersList.find((c) => c.id === id);
      if (!customer)
        throw new Error(`customer id ${id} is not exists in customers list`);
      return customer;
    },
    [customersList]
  );

  const handleChangeActive = useCallback(
    async (customerId: number, changeTo: boolean, reason?: string) => {
      if (mode === "ORDER") return null;
      const customer: Customer = findById(customerId);
      try {
        await CustomerAPI.updateCustomer(customer.id, {
          name: customer.name,
          tel: customer.tel,
          address: customer.address,
          customer_code: customer.customer_code,
          landmark: customer.landmark,
          is_juristic: customer.is_juristic || false,
          is_active: changeTo,
          banned_reason: reason,
        });
      } catch (error) {
        resolveErrorResponse(error);
      }
    },
    [findById, mode]
  );

  const handleOpenConfirmChangeActiveDialog = useCallback(
    async (customerId: number, changeTo: boolean) => {
      const customer = findById(customerId);
      const { customer_code } = customer;
      if (changeTo) {
        const { isConfirmed } = await SweetAlert.showConfirm({
          titleText: "ยกเลิกการระงับลูกค้า",
          text: `ยืนยันที่จะยกเลิกการระงับ ${customer_code}?`,
          confirmButtonText: "ยืนยัน",
          cancelButtonText: "ยกเลิก",
        });
        if (isConfirmed) await handleChangeActive(customerId, changeTo);
        return;
      }
      return banReasonDialogRef.current?.showDialog(
        customer_code,
        (reason: string) => handleChangeActive(customerId, changeTo, reason)
      );
    },
    [findById, handleChangeActive]
  );

  return (
    <div className="flex flex-col mt-4">
      <BanDialog ref={banReasonDialogRef} />
      <DataTable
        value={nullifyEmptyStrings(customersList)}
        resizableColumns
        size="large"
        stripedRows
        dataKey="id"
        scrollable
        scrollHeight="flex"
        frozenWidth="200px"
        rowClassName={(customer: Customer) => {
          const isAnno = isAnonymous(customer);
          if (isAnno) return "!bg-[#e2ebf8]";
          if (mode == "ORDER" && !customer.is_active) return "!bg-[#fbd5d6]";
          const index = customersList.findIndex((c) => c.id == customer.id);
          if (index % 2 === 0) return "!bg-gray-100 text-gray-700";
        }}
      >
        {(
          [
            {
              field: "customer_code",
              header: "รหัสลูกค้า",
              body: (customer: Customer) => customer.customer_code.substring(6),
              frozen: true,
            },
            {
              field: "name",
              header: "ชื่อ",
            },
            {
              field: "tel",
              header: "โทร",
            },
            {
              field: "address",
              header: mode === "SUSPENDED" ? "เหตุผลที่ระงับ" : "ที่อยู่",
              body: (customer: Customer) => {
                const output = customer.is_active
                  ? customer.address
                  : customer.banned_reason;
                return output || "-";
              },
            },
            {
              body: (customer: Customer) => {
                return (
                  <Buttons
                    mode={mode}
                    customer={customer}
                    onOpenInfo={onOpenInfo}
                    onRefresh={onRefresh}
                    onChangeActive={handleOpenConfirmChangeActiveDialog}
                  />
                );
              },
              frozen: true,
              alignFrozen: "right",
            },
          ] as ColumnProps[]
        ).map((props, i) => {
          const body = props.body
            ? props.body
            : (customer: Customer) => {
                const output = props.field
                  ? (customer as any)[props.field]
                  : null;
                return output || "-";
              };
          return <Column {...props} body={body} key={i} />;
        })}
      </DataTable>
    </div>
  );
};

export default List;
