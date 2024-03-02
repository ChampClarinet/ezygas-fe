import styled from "styled-components";
import colors from "@/tailwind/colors";

export const Appbar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;
  background-color: ${colors.white};

  & > div {
    height: 70px;

    @media (min-width: 768px) {
      height: 80px;
    }

    @media (min-width: 1200px) {
      height: 90px;
    }

    @media (min-width: 1440px) {
      height: 120px;
    }
  }
`;
