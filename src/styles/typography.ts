import { css } from "styled-components";
import colors from "@/tailwind/colors";

const typography = css`
  body {
    font-size: 1rem;
    color: ${colors.gray["1000"]};
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
  }

  h2 {
    font-size: 1.75rem;
    font-weight: 700;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  h4 {
    font-size: 1.25rem;
    font-weight: 400;
  }

  h5 {
    font-size: 1.125rem;
    font-weight: 400;
  }

  h6 {
    font-size: 1rem;
    font-weight: 400;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
  }

  a {
    color: ${colors.gray["1000"]};
    text-decoration: none;
    transition: 0.2s;
  }

  a:hover {
  }

  small {
    font-size: 0.75rem;
  }

  ul,
  ol {
    list-style-position: inside;
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  li {
    margin-bottom: 1rem;
  }
`;

export default typography;
