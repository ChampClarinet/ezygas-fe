import { createGlobalStyle, css } from "styled-components";
import colors from "@/tailwind/colors";
import typography from "./typography";

const BASE_SIZING = "1rem";

export const removeRingColor = css`
  box-shadow: none;
  outline: none;
`;

export const GlobalStyle = createGlobalStyle<any>`

  :root {
    font-size: ${BASE_SIZING};
  }

  ${typography}

  * {
    ${removeRingColor}

    &:not(.pi) {
      font-family: sukhumvit !important;
    }
  }

  #root, body {
    display: flex;
    min-height: 100vh;
    font-size: 16px;
    font-family: sukhumvit;
    max-width: 100%;
    width: 100%;
  }

  #app-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-width: 100vw;
  }

  body {
    background-color: ${colors.gray["100"]};
  }

  main {
    overflow-x: auto;
    overflow-y: auto;
    position: relative;
  }

  .swal2-container {
    z-index: 10000;
  }
  
  .clickable {
    cursor: pointer;

    &:active:not(:disabled) {
      transform: scale(90%);
      transition: transform 0.3s;
    }
  }
`;
