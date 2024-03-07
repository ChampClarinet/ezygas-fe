import styled from "styled-components";
import colors from "@/tailwind/colors";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  user-select: none;
  gap: 1rem;

  & > div[class*="search"] {
    max-width: 250px;
  }
`;

export const Th = styled.th`
  font-size: 1rem;
  font-weight: 700;
  padding: 0.75rem !important;
  border: 1px solid ${colors.gray["500"]};
  color: ${colors.gray["1000"]} !important;
`;

export const Tr = styled.tr`
  padding: 0.5em 0.4em;
  text-align: center;
  border: 1px solid ${colors.gray["500"]};

  td {
    border: 1px solid ${colors.gray["500"]};
    vertical-align: middle;
    padding: 0.75rem;
  }
`;
