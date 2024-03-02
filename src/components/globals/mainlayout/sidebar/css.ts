import styled, { css } from "styled-components";
import { MenuState } from "@/stores/menu";
import colors from "@/tailwind/colors";

export const Sidebar = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 4;
  height: calc(100% - 120px);
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.04), 0 1px 6px rgba(0, 0, 0, 0.04);
  padding-top: 70px;

  @media (min-width: 768px) {
    padding-top: 80px;
  }

  @media (min-width: 1200px) {
    padding-top: 90px;
  }

  @media (min-width: 1440px) {
    padding-top: 120px;
  }
`;

export interface MenuControl {
  state: MenuState;
}
const translate0 = css`
  transform: translateX(0) !important;
`;
export const MainMenu = styled.div<MenuControl>`
  width: 90px;
  transform: translateX(-90px);
  height: calc(100% - 70px);
  background: ${colors.white};
  z-index: 3;
  position: fixed;
  transition: transform 0.3s;
  padding-top: 2px;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${colors.white};

  @media (min-width: 768px) {
    width: 100px;
    transform: translateX(-100px);
    height: calc(100% - 80px);
  }

  @media (min-width: 1200px) {
    width: 110px;
    transform: translateX(-110px);
    height: calc(100% - 90px);
  }

  @media (min-width: 1440px) {
    width: 120px;
    transform: translateX(-120px);
    height: calc(100% - 120px);
  }

  ${({ state }) => (["MENU", "SUBMENU"].includes(state) ? translate0 : "")}

  .menu-item {
    img {
      filter: invert(15%) sepia(78%) saturate(0%) hue-rotate(238deg)
        brightness(93%) contrast(90%);
      height: 30px !important;
    }

    &:hover,
    &.active {
      img {
        filter: invert(17%) sepia(43%) saturate(5338%) hue-rotate(237deg)
          brightness(78%) contrast(136%);
      }

      span {
        color: ${colors.blue["900"]};
      }
    }
  }
`;

const calculateTranslate = (
  state: MenuState,
  onHideTranslate: number,
  onMenuTranslate: number,
  onSubmenuTranslate: number
) => {
  switch (state) {
    case "HIDE":
      return onHideTranslate;
    case "MENU":
      return onMenuTranslate;
    case "SUBMENU":
      return onSubmenuTranslate;
    default:
      return 0;
  }
};
export const SubMenu = styled.div<MenuControl>`
  position: fixed;
  left: 90px;
  width: 190px;
  height: calc(100% - 70px);
  z-index: 2;
  border-left: 1px solid ${colors.gray["200"]};
  box-shadow: 0 3px 30px rgba(0, 0, 0, 0.1), 0 3px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: ${colors.white};
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  transform: translateX(
    ${({ state }) => calculateTranslate(state, -330, -190, -0)}px
  );

  @media (min-width: 768px) {
    left: 100px;
    width: 200px;
    transform: translateX(
      ${({ state }) => calculateTranslate(state, -300, -200, 0)}px
    );
    height: calc(100% - 80px);
  }

  @media (min-width: 1200px) {
    left: 110px;
    width: 220px;
    transform: translateX(
      ${({ state }) => calculateTranslate(state, -330, -220, 0)}px
    );
    height: calc(100% - 90px);
  }

  @media (min-width: 1440px) {
    left: 120px;
    width: 230px;
    transform: translateX(
      ${({ state }) => calculateTranslate(state, -350, -230, 0)}px
    );
    height: calc(100% - 120px);
  }
`;
