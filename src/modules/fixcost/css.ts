import styled from "styled-components";
import colors from "@/tailwind/colors";

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  label {
    font-size: 1.25rem;
    font-weight: bold;
    color: ${colors.gray["1000"]};
    width: max-content;
    white-space: nowrap;
    display: flex;
    align-items: center;
  }

  & > input {
    min-width: 200px;
  }
`;
