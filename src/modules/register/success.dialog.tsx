"use client";
import { FC, useContext, useMemo } from "react";
import { Dialog } from "primereact/dialog";
import Button from "@/components/common/button";
import { RegisterDTO } from "@/types/user";
import { RegisterModuleContext } from ".";

export interface RegisterResult extends RegisterDTO {
  address: string;
  vendorCode: string;
}
export interface SuccessDialogProps {
  toggle: () => unknown;
}
const SuccessDialog: FC<SuccessDialogProps> = ({ toggle }) => {
  const { result } = useContext(RegisterModuleContext);
  const isOpen = useMemo(() => !!result, [result]);
  return (
    <Dialog
      header="การสมัครสำเร็จ"
      visible={isOpen}
      style={{ width: "50vw" }}
      onHide={toggle}
      dismissableMask
      pt={{
        header: {
          className: "w-full flex justify-center",
        },
      }}
      footer={
        <div className="flex justify-center items-center">
          <Button
            onClick={(e) => {
              e.preventDefault();
              toggle();
            }}
          >
            ตกลง
          </Button>
        </div>
      }
    >
      {!!result && (
        <table className="w-full">
          <tbody>
            <tr>
              <td>
                <h5 className="font-bold">คุณ:</h5>
              </td>
              <td>{`${result.first_name} ${result.last_name}`}</td>
            </tr>
            <tr>
              <td>
                <h5 className="font-bold">อีเมล:</h5>
              </td>
              <td>{result.email}</td>
            </tr>
            <tr>
              <td>
                <h5 className="font-bold">โทร:</h5>
              </td>
              <td>{result.tel}</td>
            </tr>
            <tr>
              <td>
                <h5 className="font-bold">ที่อยู่:</h5>
              </td>
              <td>{result.address}</td>
            </tr>
            <tr>
              <td>
                <h5 className="font-bold">รหัสร้านค้า:</h5>
              </td>
              <td>{result.vendorCode}</td>
            </tr>
          </tbody>
        </table>
      )}
    </Dialog>
  );
};

export default SuccessDialog;
