import { FC, useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { useForm } from "react-hook-form";
import DateHelper from "@cantabile/date-helper";
import { wait } from "@cantabile/hooks";
import { UpdateVendorDTO, WorkTime } from "@/api/vendors";
import Avatar from "@/components/common/avatar";
import Loading from "@/components/common/loading";
import { useMyVendor, useUpdateMyVendor } from "@/queries/my-vendor";
import { useDaysList } from "@/queries/general";
import {
  useDayCloses,
  useWorkTime,
  useUpdateWorkTime,
  useUpdateDayCloses,
} from "@/queries/vendor";
import { useMenuStore } from "@/stores/menu";
import Form, { VendorForm } from "./form";
import Button from "@/components/common/button";

const StoreModule: FC = () => {
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
    handleSubmit,
    reset,
  } = formHook;

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const [synced, setSynced] = useState(false);

  const vendorQuery = useMyVendor({ autoFetch: false });
  const { vendor: thisVendor } = vendorQuery;

  const dayClosesQuery = useDayCloses({ autoFetch: false });
  const workTimeQuery = useWorkTime({ autoFetch: false });
  const daysListQuery = useDaysList({ autoFetch: false });

  const { mutate: updateVendor } = useUpdateMyVendor(true, () =>
    setSynced(false)
  );
  const { mutate: updateWorkTime } = useUpdateWorkTime(true, () =>
    setSynced(false)
  );
  const { mutate: updateDayCloses } = useUpdateDayCloses(true, () =>
    setSynced(false)
  );

  const updateMenuState = useMenuStore((store) => store.updateState);

  const avatarName = thisVendor?.name_en || "E";

  const isPageReady = useMemo(
    () =>
      dayClosesQuery.isFetched &&
      workTimeQuery.isFetched &&
      daysListQuery.isFetched &&
      vendorQuery.isFetched,
    [
      dayClosesQuery.isFetched,
      daysListQuery.isFetched,
      vendorQuery.isFetched,
      workTimeQuery.isFetched,
    ]
  );

  const syncDataFromAPI = useCallback(() => {
    if (!isPageReady || !thisVendor) return;
    const workTimeDTO = workTimeQuery.workTime;
    const workTime: WorkTime | null = workTimeDTO
      ? {
          openOn: DateHelper.timeStringToTime(workTimeDTO?.open_on),
          closeOn: DateHelper.timeStringToTime(workTimeDTO?.close_on),
        }
      : null;
    const { dayCloses = [] } = dayClosesQuery;
    const {
      name_th,
      tel,
      service_charge,
      is_juristic = false,
      branch,
      tax_id,
      receipt_footer_message = "",
    } = thisVendor;

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
  }, [dayClosesQuery, isPageReady, reset, thisVendor, workTimeQuery.workTime]);

  const onSubmit = useCallback(
    async (data: VendorForm) => {
      if (!isDirty || !thisVendor) return false;
      const { id } = thisVendor;
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
      if (receipt_footer_message != null)
        mappedData = {
          ...mappedData,
          receipt_footer_message,
        };
      if (is_juristic)
        mappedData = {
          ...mappedData,
          branch: +branch,
          tax_id,
        };

      if (workTime && dirtyFields["workTime"])
        updateWorkTime({
          open_on: DateHelper.timeToTimeString(workTime.openOn),
          close_on: DateHelper.timeToTimeString(workTime.closeOn),
        });

      if (dayCloses && dirtyFields["dayCloses"]) updateDayCloses(dayCloses);

      updateVendor(mappedData);
      return true;
    },
    [
      dirtyFields,
      isDirty,
      thisVendor,
      updateDayCloses,
      updateVendor,
      updateWorkTime,
    ]
  );

  useEffect(() => {
    if (isPageReady && !synced) {
      syncDataFromAPI();
      setSynced(true);
    }
  }, [isPageReady, syncDataFromAPI, synced]);

  useEffect(() => {
    dayClosesQuery.refetch();
    workTimeQuery.refetch();
    daysListQuery.refetch();
    wait(100).then(() => updateMenuState("MENU"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={clsx(
        "store",
        "flex",
        "justify-center",
        "items-center",
        "flex-grow"
      )}
    >
      <Loading isLoading={!isPageReady}>
        {!!thisVendor && (
          <Card
            pt={{
              root: { className: "w-full" },
              content: {
                className: "items-stretch relative gap-4 flex flex-col",
              },
            }}
            footer={
              <div
                className={clsx(
                  "footer",
                  "px-5",
                  "mb-4",
                  "flex",
                  "justify-evenly",
                  "items-center"
                )}
              >
                <Button onClick={syncDataFromAPI} color="red">
                  คืนค่า
                </Button>
                <Button
                  disabled={!isDirty || hasErrors}
                  onClick={handleSubmit(onSubmit)}
                >
                  บันทึก
                </Button>
              </div>
            }
          >
            <div
              className={clsx(
                "image",
                "mb-8",
                "px-5",
                "flex",
                "justify-center",
                "items-center"
              )}
            >
              <Avatar name={avatarName} size="xlarge" />
            </div>
            <Form formHook={formHook} vendor={thisVendor} />
            <Divider />
          </Card>
        )}
      </Loading>
    </div>
  );
};

export default StoreModule;
