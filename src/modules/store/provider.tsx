"use client";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import DateHelper, { Time } from "@cantabile/date-helper";
import VendorsAPI, { UpdateVendorDTO, Vendor, WorkTime } from "@/api/vendors";
import { useDayCloses, useWorkTime } from "@/queries/vendors";
import useGlobalStore from "@/stores/global";
import { Nullable } from "@/types/general";
import { useDaysList } from "@/queries/general";

export interface VendorForm {
  name_th: string;
  tel: string;
  service_charge: string;
  is_juristic: boolean;
  branch: string;
  tax_id: string;
  receipt_footer_message: string;
  dayCloses: string[];
  workTime: WorkTime | null;
}

export interface StorePageContextType {
  myVendor: Nullable<Vendor>;
  hasErrors: boolean;
  synced: boolean;
  formHook: UseFormReturn<VendorForm> | null;
  onSubmit: (data: VendorForm) => Promise<boolean>;
  sync: () => unknown;
  isPageReady: boolean;
}

export const StorePageContext = createContext<StorePageContextType>({
  myVendor: null,
  hasErrors: false,
  synced: false,
  formHook: null,
  onSubmit: async () => false,
  sync: () => {},
  isPageReady: false,
});

const StorePageProvider: FC<PropsWithChildren> = ({ children }) => {
  const myVendor = useGlobalStore((state) => state.myVendor);

  const formHook = useForm<VendorForm>({
    defaultValues: {
      name_th: "",
      tel: "",
      service_charge: "0",
      branch: "",
      is_juristic: false,
      tax_id: "",
      receipt_footer_message: "",
      dayCloses: [],
      workTime: null,
    },
  });
  const {
    formState: { errors, isDirty, dirtyFields },
    reset,
  } = formHook;

  const [synced, setSynced] = useState(false);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const dayClosesQuery = useDayCloses();

  const workTimeQuery = useWorkTime();

  const daysListQuery = useDaysList();

  const updateVendor = useCallback(async (payload: UpdateVendorDTO) => {
    await VendorsAPI.updateVendorAPI(payload);
    setSynced(false);
  }, []);

  const updateWorkTime = useCallback(async (openOn: Time, closeOn: Time) => {
    const open_on = DateHelper.timeToTimeString(openOn);
    const close_on = DateHelper.timeToTimeString(closeOn);
    await VendorsAPI.updateWorkTimeAPI({ open_on, close_on });
    setSynced(false);
  }, []);

  const updateDayCloses = useCallback(async (days: string[]) => {
    await VendorsAPI.updateDayClosesAPI(days);
    setSynced(false);
  }, []);

  const isPageReady = useMemo(
    () =>
      !dayClosesQuery.isLoading &&
      !workTimeQuery.isLoading &&
      !daysListQuery.isLoading,
    [dayClosesQuery.isLoading, daysListQuery.isLoading, workTimeQuery.isLoading]
  );

  const sync = useCallback(() => {
    if (!isPageReady || !myVendor) return;
    const workTimeDTO = workTimeQuery.data;
    const workTime: WorkTime | null = workTimeDTO
      ? {
          openOn: DateHelper.timeStringToTime(workTimeDTO?.open_on),
          closeOn: DateHelper.timeStringToTime(workTimeDTO?.close_on),
        }
      : null;
    const dayCloses = dayClosesQuery.data || [];
    const {
      name_th,
      tel,
      service_charge,
      is_juristic = false,
      branch,
      tax_id,
      receipt_footer_message = "",
    } = myVendor;

    const form: VendorForm = {
      name_th,
      tel: tel.replace("+66", "0"),
      service_charge: service_charge + "",
      is_juristic,
      branch: branch ? branch + "" : "1",
      tax_id: tax_id || "",
      receipt_footer_message,
      workTime,
      dayCloses,
    };

    reset(form);
  }, [dayClosesQuery.data, isPageReady, myVendor, reset, workTimeQuery.data]);

  const onSubmit = useCallback(
    async (data: VendorForm) => {
      if (!isDirty || !myVendor) return false;
      const { id } = myVendor;
      const {
        service_charge,
        name_th,
        branch,
        is_juristic,
        tax_id,
        receipt_footer_message,
        dayCloses,
        workTime,
      } = data;
      const tel = "+66" + data.tel.substring(1);
      let mappedData: UpdateVendorDTO = {
        id,
        name_th,
        tel,
        is_juristic,
        service_charge: +service_charge,
      };
      if (receipt_footer_message != null) {
        mappedData = {
          ...mappedData,
          receipt_footer_message,
        };
      }
      if (is_juristic) {
        mappedData = {
          ...mappedData,
          branch: +branch,
          tax_id,
        };
      }

      if (workTime && dirtyFields["workTime"]) {
        updateWorkTime(workTime.openOn, workTime.closeOn);
      }

      if (dayCloses && dirtyFields["dayCloses"]) updateDayCloses(dayCloses);

      updateVendor(mappedData);
      return true;
    },
    [
      dirtyFields,
      isDirty,
      myVendor,
      updateDayCloses,
      updateVendor,
      updateWorkTime,
    ]
  );

  useEffect(() => {
    if (isPageReady && !synced) {
      sync();
      setSynced(true);
    }
  }, [isPageReady, sync, synced]);

  useEffect(() => {
    dayClosesQuery.fetchFn();
    workTimeQuery.fetchFn();
    daysListQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StorePageContext.Provider
      value={{
        myVendor,
        synced,
        hasErrors,
        formHook,
        onSubmit,
        sync,
        isPageReady,
      }}
    >
      {children}
    </StorePageContext.Provider>
  );
};

export default StorePageProvider;
