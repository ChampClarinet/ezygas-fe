import { useCallback } from "react";
import { CreateCustomerPayload, Customer } from "@/api/customer";
import SweetAlert from "@/utils/sweetalert";

import CreateConflictModal from "../conflict.modal";

const useRenderFuntions = () => {
  const fireCreateConflictModal = useCallback(
    async (newCustomer: CreateCustomerPayload, oldCustomer: Customer) => {
      const { isConfirmed, isDenied } = await SweetAlert.showConfirm({
        title: "ลูกค้าที่ใช้เบอร์โทรศัพท์นี้มีอยู่แล้วในระบบ",
        html: (
          <CreateConflictModal
            newCustomer={newCustomer}
            oldCustomer={oldCustomer}
          />
        ),
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "แก้ไขลูกค้าเดิม",
        denyButtonText: "แทนที่",
        cancelButtonText: "ปิด",
        customClass: {
          ...(SweetAlert.defaultOptions.customClass as any),
          denyButton: "swal-replace-customer-button",
        },
      });
      if (isConfirmed) return "MERGE";
      if (isDenied) return "RECREATE";
      return "CANCEL";
    },
    []
  );

  return {
    fireCreateConflictModal,
  };
};

export default useRenderFuntions;
