import axios from "./axios";
import { User } from "@/types/user";
import { ApiResponse } from "@/types/general";
import { UnauthorizedError } from "@/errors";

const BASE_URL_API = (process.env.NEXT_PUBLIC_URL_API || "") + "/api";
const PATH = "/auth/users/me/";

const UserAPI = {
  fetchMyAccount: async () => {
    const response = await axios.get<ApiResponse<User>>(PATH);
    return response.data;
  },

  fetchMyAccountServerside: async (token: string) => {
    const response = await fetch(BASE_URL_API + PATH, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    if (response.status >= 400)
      throw new UnauthorizedError({
        message: "error fetching account",
        status: response.status,
      });
    const responseData: ApiResponse<User> = await response.json();
    return responseData.data;
  },
};

export default UserAPI;
