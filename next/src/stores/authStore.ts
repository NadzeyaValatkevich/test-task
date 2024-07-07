import { authAPI } from "@/api/auth/authAPI";
import {
  IAuthForm,
  IMeResponse,
  IUser,
  IUserRole,
  RoleUser,
} from "@/types/auth.types";
import { StatusType } from "@/types/root.types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface useAuthStore {
  userName: string | null;
  userWithRoles: IMeResponse | null;
  token: string | null;
  role: RoleUser | null;
  error: string | null;
  status: StatusType;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setStatus: (status: StatusType) => void;
  setToken: (value: string) => void;
  setRole: (role: RoleUser | null) => void;
  setUserName: (userName: string) => void;
  setUserWithRoles: (userWithRoles: IMeResponse) => void;
  setError: (error: string | null) => void;
  login: (data: IAuthForm) => Promise<boolean>;
  me: (token: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<useAuthStore>()(
  persist(
    (set) => ({
      userName: null,
      token: null,
      userWithRoles: null,
      role: null,
      error: null,
      status: "idle",
      isLoggedIn: false,
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      setStatus: (status) => set({ status }),
      setUserName: (userName) => set({ userName }),
      setToken: (token) => set({ token }),
      setUserWithRoles: (userWithRoles) => set({ userWithRoles }),
      setRole: (role) => set({ role }),
      setError: (error) => set({ error }),

      login: async (data: IAuthForm) => {
        set({ status: "loading" });
        set({ error: null });
        try {
          const response = await authAPI.login(data);

          const { token } = response.data;
          const { name } = response.data.user;
          set({
            status: "succeeded",
            token: token,
            userName: name,
            isLoggedIn: true,
          });

          return true;
        } catch (error: any) {
          set({ error: error.response?.data?.error || "Произошла ошибка" });
          set({ status: "failed" });
          return false;
        }
      },

      me: async (token: string) => {
        set({ status: "loading" });
        set({ error: null });
        try {
          const response = await authAPI.me(token);

          if (
            response.data.roles.find((user: IUserRole) => {
              return user.name === "Админ";
            })
          ) {
            set({ role: "Админ" });
          } else {
            set({ role: "Пользователь" });
          }

          set({
            userWithRoles: response.data,
            token,
          });

          set({ status: "succeeded" });
        } catch (error: any) {
          set({ error: error.response?.data?.error || "Произошла ошибка" });
          set({ status: "failed" });
        }
      },

      logout: () => {
        set({
          userName: null,
          token: null,
          userWithRoles: null,
          role: null,
          error: null,
          status: "idle",
          isLoggedIn: false,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        userName: state.userName,
        userWithRoles: state.userWithRoles,
        role: state.role,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
