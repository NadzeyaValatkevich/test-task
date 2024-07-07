import { IAuthForm, IAuthResponse, IMeResponse } from "@/types/auth.types";
import { instance } from "../instance";

export const authAPI = {
  me(token: string) {
    return instance.get<IMeResponse>("/me", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  },

  login(data: IAuthForm) {
    return instance.post<IAuthResponse>("/login", data);
  },
};
