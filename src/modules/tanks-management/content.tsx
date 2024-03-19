import { FC, lazy, useContext } from "react";
import { Card } from "primereact/card";

import PageHeader from "@/components/common/pageheader";
import Searchbox from "@/components/common/searchbox";
import TanksManagementContext from "./provider";
import Tabs from "@/components/common/tabs";

const OverviewTab = lazy(() => import("./overview.tab"));

const Content: FC = () => {
  const context = useContext(TanksManagementContext);
  const { search, setSearch, formProps, stocks } = context;
  // console.log({ stocks, formProps: formProps?.formState.defaultValues });
  return (
    <div className="flex flex-col h-full gap-3">
      <PageHeader name="การจัดการถัง" headerComponent={<></>} separator>
        <div className="w-[200px]">
          <Searchbox onChange={setSearch} value={search} />
        </div>
      </PageHeader>

      <Card
        pt={{
          body: { className: "py-0" },
        }}
      >
        <Tabs
          list={[
            {
              panelProps: {
                header: "ภาพรวมถัง",
              },
              children: <OverviewTab />,
            },
            {
              panelProps: {
                header: "รอการเติมแก๊ส",
              },
              children: <>fill</>,
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default Content;
