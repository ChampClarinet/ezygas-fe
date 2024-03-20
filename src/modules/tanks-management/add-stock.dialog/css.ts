import styled from "styled-components";
import colors from "@/tailwind/colors";

export const InputGroup = styled.div`
  & > * {
    display: flex;
    justify-content: space-between;
    flex-basis: 45%;
    gap: 0.5rem;
    max-width: calc(50% - 0.5rem);
    overflow: hidden;
    flex-grow: 1;

    & > label {
      display: flex;
      align-items: center;
      color: ${colors.blue[900]};
      font-weight: 700;
      font-size: 0.9rem;
      line-height: 1.5rem;
    }

    .p-autocomplete, .p-inputtext {
      width: 120px;
    }
  }
`;
