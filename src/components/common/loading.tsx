import styled from "styled-components";
import colors from "@/tailwind/colors";

interface IProps {
  isLoading: boolean;
  children?: any;
  isError?: boolean;
  flex?: boolean;
}
/**
 * Using this as loading placeholder
 */
const Loading = ({ isLoading, children, isError, flex = true }: IProps) => {
  if (isError) return <Placeholder>{"Error"}</Placeholder>;
  if (isLoading)
    return (
      <LoadingContext style={{ flex: flex ? 1 : 0 }}>
        <LoadingStyled className="loading" />
      </LoadingContext>
    );
  return children || <></>;
};

const Placeholder = styled.h1`
  //
`;

const LoadingContext = styled.div`
  position: relative;
  min-height: 70px;
`;

const LoadingStyled = styled.div`
  position: absolute !important;
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 2px solid rgba(15, 86, 179, 0.2);
  border-radius: 50%;
  border-top-color: ${colors.blue['900']};
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  left: calc(50% - 15px);
  top: calc(50% - 15px);
  position: fixed;
  z-index: 1;
`;

export default Loading;
