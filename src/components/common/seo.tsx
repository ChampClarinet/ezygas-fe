import { FC, useCallback, useEffect } from "react";

const APP_NAME = "Ezygas";

export interface SEOProps {
  title?: string;
}
const SEO: FC<SEOProps> = ({ title }) => {
  const handleSetTitle = useCallback((siteName: string) => {
    const mode = process.env.NODE_ENV;
    const title = `${siteName && `${siteName} - `}${APP_NAME}${
      mode === "development" && " - DEV MODE"
    }`;
    if (typeof document !== "undefined") document.title = title;
  }, []);
  useEffect(() => {
    title && handleSetTitle(title);
  }, [handleSetTitle, title]);
  return <></>;
};

export default SEO;
