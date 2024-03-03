import { FC, useMemo } from "react";
import { CreateCustomerPayload, Customer } from "@/api/customer";
import { CreateConflictModalBody, CreateConflictModalTd } from "./css";

export interface CreateConflictModalProps {
  oldCustomer: Customer;
  newCustomer: CreateCustomerPayload;
}
const CreateConflictModal: FC<CreateConflictModalProps> = ({
  oldCustomer,
  newCustomer,
}) => {
  const data = useMemo(() => {
    return [
      {
        key: 1,
        title: "รหัสลูกค้า",
        isDuplicated: false,
        value: oldCustomer.customer_code,
      },
      {
        key: 2,
        title: "ชื่อ",
        isDuplicated: oldCustomer.name == newCustomer.name,
        value: oldCustomer.name || "-",
      },
      {
        key: 3,
        title: "เบอร์โทรศัพท์",
        isDuplicated: true,
        value: oldCustomer.tel,
      },
      {
        key: 4,
        title: "ที่อยู่",
        isDuplicated: oldCustomer.address == newCustomer.address,
        value: oldCustomer.address || "-",
      },
    ];
  }, [newCustomer, oldCustomer]);

  return (
    <CreateConflictModalBody>
      <table>
        <tbody>
          {data.map(({ isDuplicated, title, value, key }) => (
            <tr key={key}>
              <td>{title}</td>
              <CreateConflictModalTd is_duplicated={isDuplicated}>
                {value}
              </CreateConflictModalTd>
            </tr>
          ))}
        </tbody>
      </table>
    </CreateConflictModalBody>
  );
};

export default CreateConflictModal;
