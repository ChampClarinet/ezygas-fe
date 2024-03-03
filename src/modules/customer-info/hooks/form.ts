import { useCallback, useEffect, useState } from "react";
import CustomerAPI, { CreateCustomerPayload, Customer } from "@/api/customer";
import { PersonalPrice } from "@/api/personal-prices";
import { useToastContext } from "@/hooks/toast";
import Sweetalert from "@/utils/sweetalert";
import { resolveErrorResponse } from "@/utils/error";
import { CustomerForm } from "../form";

const emptyForm: CustomerForm = {
  name: "",
  tel: "",
  address: "",
  is_active: true,
  landmark: "",
  is_juristic: false,
  branch: "1",
  tax_id: "",
  personal_price_name: "",
  banned_reason: "",
};
export interface UseForm {
  customer: Customer | null;
  isOpen: boolean;
  personalPricesList: PersonalPrice[];
  validateTel: (
    payload: CreateCustomerPayload
  ) => Promise<["CANCEL" | "MERGE" | "RECREATE" | null, Customer | null]>;
  onSubmit?: () => unknown;
  onClose: () => unknown;
}
const useForm = ({
  customer,
  isOpen,
  personalPricesList,
  validateTel,
  onSubmit,
  onClose,
}: UseForm) => {
  const toast = useToastContext();

  const [defaultData, setDefaultData] = useState(emptyForm);

  const handleClearAllStates = useCallback(() => {
    setDefaultData(emptyForm);
  }, []);

  const mapCustomerToForm = useCallback(() => {
    if (!customer) return emptyForm;
    const personalPrice = customer.personal_price?.length
      ? customer.personal_price[0]
      : null;

    const form: CustomerForm = {
      name: customer.name,
      address: customer.address,
      is_active: customer.is_active,
      is_juristic: customer.is_juristic || false,
      landmark: customer.landmark,
      tel: customer.tel,
      branch: (customer.branch ? customer.branch : 1) + "",
      tax_id: customer.tax_id || "",
      personal_price_name: personalPrice?.name || "",
      banned_reason: customer.banned_reason || "",
    };
    setDefaultData(form);
    return form;
  }, [customer]);

  const updateOrCreateCustomer = useCallback(
    async (form: CustomerForm) => {
      const personalPriceSelecting = personalPricesList.find(
        ({ name }) => name === form.personal_price_name
      );
      const { name, tel, address, is_active, landmark, is_juristic } = form;
      let successMsg = "";
      try {
        Sweetalert.showLoading();
        if (customer) {
          //? EDIT
          successMsg = "อัพเดทข้อมูลลูกค้าแล้ว";
          await CustomerAPI.updateCustomer(customer.id, {
            address: form.address,
            banned_reason: form.banned_reason,
            branch: form.branch,
            is_active: form.is_active,
            is_juristic: form.is_juristic,
            landmark: form.landmark,
            name: form.name,
            personal_price_id: personalPriceSelecting?.id || undefined,
            tax_id: form.tax_id,
            tel: form.tel,
            customer_code: customer.customer_code,
          });
        } else {
          //? CREATE
          try {
            const payload: CreateCustomerPayload = {
              address: form.address,
              is_active: form.is_active,
              is_juristic: form.is_juristic,
              landmark: form.landmark,
              name: form.name,
              tel: form.tel,
              branch: form.branch,
              personal_price_id: personalPriceSelecting?.id,
              tax_id: form.tax_id,
            };
            const [action, oldCustomer] = await validateTel(payload);
            const createCustomerData: CreateCustomerPayload = {
              address: payload.address,
              branch: form.branch,
              is_active: payload.is_active,
              is_juristic: payload.is_juristic,
              landmark: payload.landmark,
              name: payload.name,
              personal_price_id: payload.personal_price_id || undefined,
              tax_id: payload.tax_id || "",
              tel: payload.tel,
            };
            if (action == null && oldCustomer == null) {
              await CustomerAPI.createCustomer(createCustomerData);
              successMsg = "เพิ่มลูกค้าสำเร็จ";
            } else if (action == "CANCEL" || oldCustomer == null) return false;
            else if (action == "RECREATE") {
              await CustomerAPI.deleteCustomer(oldCustomer.customer_code);
              await CustomerAPI.createCustomer(createCustomerData);
              successMsg = "เพิ่มลูกค้าสำเร็จ";
            } else if (action == "MERGE") {
              await CustomerAPI.updateCustomer(oldCustomer.id, {
                name,
                tel,
                address,
                is_active,
                landmark,
                is_juristic,
                banned_reason: "",
                branch: form.branch,
                personal_price_id: personalPriceSelecting?.id || undefined,
                tax_id: form.tax_id,
                customer_code: oldCustomer.customer_code,
              });
              successMsg = "อัพเดทข้อมูลลูกค้าแล้ว";
            } else throw new Error("Flow broke");
          } catch (error) {
            resolveErrorResponse(error);
          }
          toast.showToast({ content: successMsg, severity: "success" });
        }
      } catch (e) {
        console.error("update or create customer error: " + e);
        resolveErrorResponse(e);
      }
      Sweetalert.close();
      return true;
    },
    [customer, personalPricesList, toast, validateTel]
  );

  const handleSubmit = useCallback(
    async (form: CustomerForm) => {
      await updateOrCreateCustomer(form);
      onSubmit && onSubmit();
      onClose();
    },
    [onClose, onSubmit, updateOrCreateCustomer]
  );

  useEffect(() => {
    isOpen && mapCustomerToForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, customer]);
  return {
    handleClearAllStates,
    handleSubmit,
    defaultData,
  };
};

export default useForm;
