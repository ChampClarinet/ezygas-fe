import { FC } from "react";
import clsx from "clsx";
import { TabPanel, TabPanelProps, TabView } from "primereact/tabview";

export interface TabItem {
  panelProps?: TabPanelProps;
  children?: any;
}
export interface TabsProps {
  list: TabItem[];
  scrollable?: boolean;
}
const Tabs: FC<TabsProps> = (props) => {
  const { list, scrollable = false } = props;

  return (
    <TabView
      scrollable={scrollable}
      pt={{
        inkbar: { className: "bg-current" },
        navContainer: { className: "flex" },
        nextButton: { className: "bg-white" },
        nav: {
          className: "list-none",
        },
        panelContainer: {
          className: "p-0",
        },
      }}
    >
      {list.map((item, index) => {
        return (
          <TabPanel
            key={index}
            pt={{
              headerTitle: ({ parent }: any) => {
                const isActive = index == parent.state.activeIndex;
                return {
                  className: clsx(isActive && "text-current", "font-sukhumvit"),
                };
              },
            }}
            {...item.panelProps}
          >
            {item.children}
          </TabPanel>
        );
      })}
    </TabView>
  );
};

export default Tabs;
