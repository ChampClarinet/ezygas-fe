import styled from "styled-components";
import colors from "@/tailwind/colors";

export const Container = styled.div`
  display: flex;
  border: 1px solid ${colors.blue["900"]};
  border-radius: 2.5em;
  width: 100%;
  height: 2.5em;
  justify-content: space-around;

  .search-box {
    border: none !important;
    background: transparent !important;
    flex: 1;
    padding: 0px 0.75rem;
    font-size: 0.8rem;
  }
`;
