import { GetServerSideProps } from "next";
import { ModuleProps } from "@/types/general";
import AuthUtils from "./auth";
import MasterAPI from "@/api/master";
import { Menu, SubMenu } from "@/types/misc";

export const publicPage: GetServerSideProps = async (ctx) => {
  const [alreadyAuthenticated, token] = await AuthUtils.loginCheckServerSide(
    ctx.req,
    ctx.res
  );
  if (alreadyAuthenticated)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  let props: ModuleProps = {
    authenticated: false,
  };
  if (token)
    props = {
      ...props,
      token,
    };
  return { props };
};

export const authenticatedPage: GetServerSideProps = async (ctx) => {
  const [isAuthenticated, token] = await AuthUtils.loginCheckServerSide(
    ctx.req,
    ctx.res
  );
  if (!isAuthenticated || !token)
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  const [menu, submenu] = await getMenus(token);
  let props: ModuleProps = {
    authenticated: true,
    menu,
    submenu,
  };
  if (token)
    props = {
      ...props,
      token: token,
    };
  return {
    props,
  };
};

const getMenus = async (token: string): Promise<[Menu[], SubMenu[]]> => {
  const response = await MasterAPI.fetchMenu(token);
  const { main_menu, sub_menu } = response.data.data;
  return [main_menu, sub_menu];
};
