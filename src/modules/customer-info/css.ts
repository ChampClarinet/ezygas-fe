import styled, { css } from "styled-components";
import colors from "@/tailwind/colors";

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

  .personal-price {
    td {
      padding: 0.25rem;
      color: ${colors.gray[1050]};
    }
    
    .label {
      width: 110px;
      padding-left: 0;
      
      span {
        color: ${colors.gray[1050]};
        font-weight: bold;
      }
    }

    .select {
      max-width: 50%;
    }
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

export const Label = styled.span`
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

export const Input = styled.input<{ iscorrect?: number }>`
  border-color: ${({ iscorrect: isCorrect = true }) =>
    isCorrect ? colors.green[700] : colors.red[300]};

  &:focus {
    border-color: ${({ iscorrect: isCorrect = true }) =>
      isCorrect ? colors.green[700] : colors.red[300]};
  }
`;

export const TextArea = styled.textarea`
  &:focus {
    border-color: ${colors.green[700]};
  }
`;

export const Error = styled.span`
  margin-top: 5px;
  padding: 0 0.75rem;
  color: ${colors.red[300]};
  font-size: 80%;
`;

export const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.25rem;
`;

export const Tag = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: ${colors.blue["900"]};
  color: white;
  border-radius: 5px;

  .close {
    opacity: 1;
    font-size: 1.3em;
    font-weight: bold;
    color: ${colors.red[700]};
    transition: 0.1s ease-in-out;

    &:hover,
    &:focus {
      filter: brightness(120%);
    }
  }
`;

export const BanInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  align-items: stretch;
`;

export const CreateConflictModalBody = styled.div`
  table {
    border: none;
    margin: 0 auto;

    td:first-child {
      text-align: left;

      &::after {
        content: ":";
      }
    }
  }
`;

const highlight = css`
  font-weight: 700;
  color: ${colors.red[300]};
`;
export const CreateConflictModalTd = styled.td<{ is_duplicated: boolean }>`
  ${({ is_duplicated }) => (is_duplicated ? highlight : "")}
`;
