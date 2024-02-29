import { FC, PropsWithChildren, ReactNode } from "react";
import { Divider } from "primereact/divider";

export interface PageHeaderProps extends PropsWithChildren {
  separator?: boolean;
  name?: string;
  headerComponent?: ReactNode;
}
const PageHeader: FC<PageHeaderProps> = (props) => {
  const { children, separator = true, name, headerComponent } = props;
  return (
    <>
      <div className="flex gap-2 justify-between items-center mb-2 flex-wrap">
        <h1 className="font-bold text-current text-2xl whitespace-nowrap m-0 p-0">
          {name}
        </h1>
        {headerComponent}
      </div>
      {children}
      {separator && <Divider />}
    </>
  );
};

export default PageHeader;
