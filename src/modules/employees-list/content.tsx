import { FC, useCallback, useContext, useRef } from "react";
import Button from "@/components/common/button";
import Loading from "@/components/common/loading";
import PageHeader from "@/components/common/pageheader";
import PlaceholderWrapper from "@/components/common/placeholder";
import Searchbox from "@/components/common/searchbox";
import { Container } from "./css";
import EmployeesListPageContext from "./provider";

import List from "./list";
import EmployeeModal from "./info.modal";

const Content: FC = () => {
  const employeeInfoRef = useRef<EmployeeModal>(null);
  const { employeesQuery } = useContext(EmployeesListPageContext);
  const {
    search,
    setSearch,
    isValidating: isLoading,
    error: isError,
    isNoData,
    isResultEmpty,
    filteredEmployees,
  } = employeesQuery!;

  const handleOpenInfo = useCallback((id?: number) => {
    employeeInfoRef.current?.showDialog(id);
  }, []);
  return (
    <Container>
      <PageHeader
        name="รายชื่อคนส่ง"
        headerComponent={
          <Button onClick={() => handleOpenInfo()}>
            เพิ่มคนส่ง
          </Button>
        }
      >
        <Searchbox onChange={setSearch} value={search} />
      </PageHeader>

      <Loading isLoading={isLoading} isError={isError}>
        <PlaceholderWrapper isNoData={isNoData} isResultEmpty={isResultEmpty}>
          <List onOpenInfo={handleOpenInfo} />
        </PlaceholderWrapper>
        <EmployeeModal ref={employeeInfoRef} />
      </Loading>
    </Container>
  );
};

export default Content;
