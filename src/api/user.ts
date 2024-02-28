import axios from "./axios";
import { User } from "@/types/user";
import { ApiResponse } from "@/types/general";

const PATH = "/auth/users/me/";

const UserAPI = {
  fetchMyAccount: async () => {
    const response = await axios.get<ApiResponse<User>>(PATH);
    return response.data;
  },
};

export default UserAPI;
