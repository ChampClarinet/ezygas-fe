import { FunctionComponent, useCallback, useMemo } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { CustomersListMode } from "..";
import CustomerAPI, { Customer } from "@/api/customer";
import Button from "@/components/common/button";
import { useToastContext } from "@/hooks/toast";
import { isAnonymous } from "@/utils";
import { resolveErrorResponse } from "@/utils/error";
import SweetAlert from "@/utils/sweetalert";

const buttonClasses = clsx(
  "cursor-pointer",
  "hover:scale-90",
  "transition-transform",
  "duration-300",
  "text-xl"
);

export interface ButtonsProps {
  mode: CustomersListMode;
  customer: Customer;
  onOpenInfo: (customerId: number) => unknown;
  onRefresh: () => unknown;
  onChangeActive: (customerId: number, changeTo: boolean) => unknown;
}
const Buttons: FunctionComponent<ButtonsProps> = (props) => {
  const router = useRouter();
  const { mode, customer, onOpenInfo, onRefresh } = props;

  const toast = useToastContext();

  const onShopping = useCallback(() => {
    router.push(`/orders/order/${customer.id}`);
  }, [customer.id, router]);

  const handleChangeActive = useCallback(
    (changeTo: boolean) => {
      props.onChangeActive(customer.id, changeTo);
    },
    [customer.id, props]
  );

  const onDelete = useCallback(async () => {
    const { customer_code } = customer;
    const { isConfirmed } = await SweetAlert.showConfirm({
      text: `ยืนยันที่จะลบลูกค้า ${customer_code.substring(6)}`,
      showCancelButton: true,
      confirmButtonText: "ลบ",
    });
    if (isConfirmed) {
      SweetAlert.showLoading();
      try {
        await CustomerAPI.deleteCustomer(customer_code);
        toast.showToast({
          content: "ลบลูกค้าสำเร็จ",
          severity: "success",
        });
        SweetAlert.close();
        return onRefresh();
      } catch (e) {
        console.error(`delete customer ${customer_code} error: ` + e);
        SweetAlert.close();
        return resolveErrorResponse(e);
      }
    }
  }, [customer, onRefresh, toast]);

  const mutable = useMemo(() => !isAnonymous(customer), [customer]);

  return (
    <div className={clsx("flex", "gap-4", "justify-evenly", "items-center")}>
      {mutable && (
        <>
          <i
            className={clsx(buttonClasses, "pi pi-pencil")}
            onClick={() => onOpenInfo(customer.id)}
          />

          <i
            className={clsx(buttonClasses, "text-red", "pi pi-trash")}
            onClick={onDelete}
          />
        </>
      )}
      {mode === "ORDER" ? (
        <i
          onClick={onShopping}
          className={clsx(buttonClasses, "pi pi-shopping-cart")}
        />
      ) : (
        <Button
          onClick={() => handleChangeActive(!customer.is_active)}
          color={customer.is_active ? "red" : "green"}
          baseProps={{
            className: clsx("max-w-[120px]", "py-1", "px-4"),
          }}
        >
          {customer.is_active ? "ระงับ" : "ยกเลิกการระงับ"}
        </Button>
      )}
    </div>
  );
};

export default Buttons;
