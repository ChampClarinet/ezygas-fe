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
  noBackground?: boolean;
}
const Tabs: FC<TabsProps> = (props) => {
  const { list, scrollable = false, noBackground = false } = props;

  return (
    <TabView
      scrollable={scrollable}
      pt={{
        inkbar: { className: "bg-current" },
        navContainer: { className: clsx("flex") },
        nextButton: { className: clsx(!noBackground && "bg-white") },
        nav: {
          className: clsx("list-none", noBackground && "bg-transparent"),
        },
        panelContainer: {
          className: clsx("p-0", noBackground && "bg-transparent"),
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
              headerAction: {
                className: clsx(noBackground && "bg-transparent"),
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
