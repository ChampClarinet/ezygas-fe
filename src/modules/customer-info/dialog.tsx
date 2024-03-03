import { FC, useEffect } from "react";
import { useCustomer } from "@/queries/customers";
import { usePersonalPricesList } from "@/queries/personal-price";
import Loading from "@/components/common/loading";

import useForm from "./hooks/form";
import useStates from "./hooks/states";
import useRenderFuntions from "./hooks/render";
import useHandlers from "./hooks/handlers";

import Form from "./form";

export interface DialogProps {
  isOpen: boolean;
  toggle: () => unknown;
  customerId?: number;
  onSubmit?: () => unknown;
  nameDuplicateCheckFn?: (name: string) => boolean;
}
const Dialog: FC<DialogProps> = (props) => {
  const { isOpen, onSubmit, toggle, customerId, nameDuplicateCheckFn } = props;

  const customerQuery = useCustomer(customerId, {
    with_pending_tank: false,
    with_personal_price: true,
  });
  const { customer } = customerQuery;
  const personalPricesQuery = usePersonalPricesList();
  const { personalPricesList, isValidating: personalPriceLoading } =
    personalPricesQuery;

  const { fireCreateConflictModal } = useRenderFuntions();
  const { validateTel } = useHandlers({
    handleShowCreateConflictModal: fireCreateConflictModal,
  });
  const { handleClearAllStates, handleSubmit, defaultData } = useForm({
    customer,
    isOpen,
    personalPricesList,
    validateTel,
    onClose: toggle,
    onSubmit,
  });
  const { handleRefetch, isError, isLoading } = useStates({
    ppQuery: personalPricesQuery,
    cQuery: customerQuery,
    customerId,
  });

  useEffect(() => {
    if (isOpen) handleRefetch();
    else handleClearAllStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId, isOpen]);
  //TODO error on open
  return (
    <Loading isLoading={isLoading} isError={isError}>
      <Form
        toggle={toggle}
        defaultData={defaultData}
        onSubmit={handleSubmit}
        nameDuplicateCheckFn={nameDuplicateCheckFn}
        personalPrices={personalPricesList}
        personalPriceLoading={personalPriceLoading}
      />
    </Loading>
  );
};

export default Dialog;
