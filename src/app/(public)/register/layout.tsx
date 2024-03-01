"use client";
import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Layout;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: url(/assets/img/regis-bg.svg) no-repeat 50% fixed;
  background-size: cover;
`;
