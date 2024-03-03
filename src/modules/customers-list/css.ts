import { styled } from "styled-components";
import { CustomersListMode } from ".";

interface ContainerProps {
  mode: CustomersListMode;
}
export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  user-select: none;

  & > div[class^="search"] {
    margin-bottom: 1rem;
    max-width: 250px;
    margin-left: ${({ mode }) => (mode == "ORDER" ? "auto" : "0")};
  }
`;
