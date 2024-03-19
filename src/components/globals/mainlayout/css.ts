import styled from "styled-components";
import { MenuState } from "@/stores/menu";

export interface WithMenuState {
  $state: MenuState;
}
export const Main = styled.main<WithMenuState>`
  margin: 85px 15px 0;
  transition: margin-left 0.3s;
  flex: 1 1 0%;

  @media (min-width: 768px) {
    margin: ${({ $state: state }) =>
      `110px 40px 20px ${
        state === "SUBMENU" ? 340 : state === "MENU" ? 140 : 40
      }`}px;
  }

  @media (min-width: 1200px) {
    margin: ${({ $state: state }) =>
      `130px 50px 30px ${
        state === "SUBMENU" ? 380 : state === "MENU" ? 160 : 50
      }`}px;
  }

  @media (min-width: 1440px) {
    margin: ${({ $state: state }) =>
      `165px 60px 40px ${
        state === "SUBMENU" ? 410 : state === "MENU" ? 180 : 60
      }`}px;
  }
`;
