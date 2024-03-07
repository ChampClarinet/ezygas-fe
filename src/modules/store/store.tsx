"use client";
import { FC, useContext } from "react";
import clsx from "clsx";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import Avatar from "@/components/common/avatar";
import Button from "@/components/common/button";
import Loading from "@/components/common/loading";

import { StorePageContext } from "./provider";
import Form from "./form";

const StoreModule: FC = () => {
  const { myVendor, isPageReady, sync, formHook, hasErrors, onSubmit } =
    useContext(StorePageContext);

  const {
    formState: { isDirty },
    handleSubmit,
  } = formHook!;

  const avatarName = myVendor?.name_en || "E";

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
        {!!myVendor && (
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
                <Button onClick={sync} color="red">
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
            <Form />
            <Divider />
          </Card>
        )}
      </Loading>
    </div>
  );
};

export default StoreModule;
