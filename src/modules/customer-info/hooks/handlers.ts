import { useCallback } from "react";
import CustomerAPI, { CreateCustomerPayload, Customer } from "@/api/customer";
import { resolveErrorResponse } from "@/utils/error";

export interface UseHandlers {
  handleShowCreateConflictModal: (
    newCustomer: CreateCustomerPayload,
    oldCustomer: Customer
  ) => Promise<"CANCEL" | "MERGE" | "RECREATE">;
}
const useHandlers = ({ handleShowCreateConflictModal }: UseHandlers) => {
  const validateTel = useCallback(
    async (
      form: CreateCustomerPayload
    ): Promise<["CANCEL" | "MERGE" | "RECREATE" | null, Customer | null]> => {
      const { tel } = form;
      try {
        const customers = await CustomerAPI.fetchCustomersList({
          active: true,
          with_pending_tank: false,
          with_personal_price: false,
          tel,
        });
        if (customers.length) {
          //? prompt modal
          const oldCustomer = customers[0];
          const newCustomer = form;
          const action = await handleShowCreateConflictModal(
            newCustomer,
            oldCustomer
          );
          return [action, oldCustomer];
        } else {
          return [null, null];
        }
      } catch (error) {
        resolveErrorResponse(error);
      }
      return ["CANCEL", null];
    },
    [handleShowCreateConflictModal]
  );

  return { validateTel };
};

export default useHandlers;
