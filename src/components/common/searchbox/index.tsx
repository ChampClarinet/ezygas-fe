import React, { FunctionComponent, useCallback } from "react";
import InputText from "@/components/common/input";
import clsx from "clsx";
import { Container } from "./css";

interface SearchboxProps {
  value?: string;
  onChange: (changeTo: string) => any;
  placeholder?: string;
  handleSearch?: () => unknown;
  containerClasses?: string;
}
/**
 * Use these components when using search fields following Ezygas design pattern.
 * Props list
 * 1. value -> Value of the input.
 * 2. onChange -> handle function for onChange event.
 */
const Searchbox: FunctionComponent<SearchboxProps> = ({
  value = "",
  onChange,
  placeholder = "ค้นหา",
  handleSearch,
  containerClasses,
}) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!handleSearch) return;
      if (e.key === "Enter") handleSearch();
    },
    [handleSearch]
  );
  return (
    <Container className={`search-box-container ${containerClasses}`}>
      <InputText
        className="search-box"
        placeholder={placeholder}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={(e) => onChange(e.target.value)}
      />
      <div
        onClick={handleSearch}
        className={clsx(
          "search",
          "flex",
          "flex-col",
          "justify-center",
          handleSearch != null && "cursor-pointer",
          "mx-2"
        )}
      >
        <i className="pi pi-search text-current h-[17px] w-[17px]" />
      </div>
    </Container>
  );
};

export default Searchbox;
