import styled, { css } from "styled-components";
import colors from "@/tailwind/colors";

const shadow = css`
  box-shadow: 0 1px 15px rgb(0 0 0 / 4%), 0 1px 6px rgb(0 0 0 / 4%);
`;

const color = colors.blue["900"];
export default styled.div`
  display: flex;
  flex: 1;

  .range {
    width: 100%;
    border-radius: 0.3em;
    height: 7px;
    width: 100%;
    outline: none;
    transition: 450ms ease-in;
    appearance: none;
    -webkit-appearance: none;
    background-color: ${colors.gray["300"]};
    ${shadow}
  }

  input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 1.2em;
    height: 1.2em;
    border-radius: 50%;
    cursor: ew-resize;
    background: ${color};
    -webkit-box-shadow: 0px 0px 18px -2px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 18px -2px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 18px -2px rgba(0, 0, 0, 0.75);
    cursor: pointer;
  }
`;
