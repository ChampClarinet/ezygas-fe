import { FC } from "react";

import StorePageProvider from "./provider";
import Store from "./store";

const StoreModule: FC = () => (
  <StorePageProvider>
    <Store />
  </StorePageProvider>
);

export default StoreModule;
