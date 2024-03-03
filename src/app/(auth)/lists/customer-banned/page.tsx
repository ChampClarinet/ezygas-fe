import { FC } from "react";
import CustomersList from "@/modules/customers-list";

const BannedCustomersListPage: FC = () => <CustomersList mode="SUSPENDED" />;

export default BannedCustomersListPage;
