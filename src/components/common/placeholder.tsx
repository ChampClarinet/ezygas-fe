import styled from "styled-components";

interface PlaceholderProps {
  isNoData: boolean;
  isResultEmpty?: boolean;
  children?: any;
  noDataPlaceholder?: string;
  resultEmptyPlaceholder?: string;
}
const PlaceholderWrapper = (props: PlaceholderProps) => {
  const { isNoData, isResultEmpty = false, children } = props;
  if (isNoData)
    return (
      <Placeholder className="no-data-placeholder">
        {props.noDataPlaceholder || "ยังไม่มีข้อมูล"}
      </Placeholder>
    );
  if (isResultEmpty)
    return (
      <Placeholder className="empty-result-placeholder">
        {props.resultEmptyPlaceholder || "ไม่มีรายการ"}
      </Placeholder>
    );
  return children || <></>;
};

const Placeholder = styled.h1`
  font-weight: bold;
  margin: 1rem 0;
  font-size: 1.5rem;
`;

export default PlaceholderWrapper;
