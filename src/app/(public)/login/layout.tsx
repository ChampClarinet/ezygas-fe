"use client";
import { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import styled from "styled-components";

const LoginLayout: FC<PropsWithChildren> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default LoginLayout;

const Container = styled.div.attrs({
  className: clsx(
    "login-layout",
    "flex",
    "justify-center",
    "items-center",
    "w-screen",
    "h-screen",
    "mx-auto"
  ),
})`
  &::before {
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(/assets/img/login-bg.svg) no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
`;
