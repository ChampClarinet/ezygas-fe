import styled from "styled-components";
import InputText from "@/components/common/input";
import colors from "@/tailwind/colors";
import clsx from "clsx";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 1.75rem;

  & > * {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

export const Field = styled.div`
  display: flex;

  & > :first-child {
    flex: 0 0 22%;
  }
  & > :last-child {
    flex: 1 0 150px;
  }
`;

export const Label = styled.label`
  font-size: 1em;
  font-weight: bold;
  padding-top: 0.75rem;

  &::after {
    content: ":";
    margin-left: 1px;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  & > * {
    width: 100%;
  }
`;

export const Input = styled(InputText).attrs<{ isCorrect: boolean }>(
  (props) => ({
    className: clsx(
      "border",
      "border-solid",
      props.isCorrect ? "border-green-700" : "border-red-700"
    ),
  })
)``;

export const Error = styled.span`
  margin-top: 5px;
  padding: 0 0.75rem;
  color: ${colors.red[300]};
  font-size: 80%;
`;
