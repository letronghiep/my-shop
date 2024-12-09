import { FormData } from "@/schemas/SignInSchema";
import { SignUpFormType } from "@/schemas/SignUpSchema";
import { login } from "@/services/auth/login";
import { handleLogout } from "@/services/auth/logout";
import { registerUser } from "@/services/auth/register";
import { IUser, TokenProps } from "@/types/global";
import { notification } from "antd";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  user: IUser;
  token: TokenProps;
  loading: boolean;
  isAuthenticated: boolean;
  login: (body: FormData) => Promise<void>;
  signup: (body: SignUpFormType) => Promise<void>;
  // reLogin: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: {},
      token: {},
      isAuthenticated: false,
      loading: false,

      login: async (body) => {
        set({ loading: true });
        try {
          const data = await login(body);
          if (data.status === 200) {
            const { metadata } = data;
            set((state) => ({
              ...state,
              user: metadata.user,
              token: {
                accessToken: metadata.tokens.accessToken,
                client_id: metadata.user._id,
              },
              isAuthenticated: true,
              loading: false,
            }));
            const dataToken = {
              accessToken: metadata.tokens.accessToken,
              client_id: metadata.user._id,
            };
            localStorage.setItem("token", JSON.stringify(dataToken));
            notification.open({
              message: "Đăng nhập thành công",
              type: "success",
              showProgress: true,
            });
          } else {
            set({ loading: false });
            notification.error({
              message: data.message,
              type: "error",
            });
          }
        } catch (error: any) {
          set({ loading: false });
          // console.error("Login failed", error);
          notification.error({
            message: error.message,
            type: "error",
          });
        }
      },

      signup: async (body) => {
        set({ loading: true });
        try {
          const data = await registerUser(body);
          const { metadata } = data;
          set((state) => ({
            ...state,
            user: metadata.user,
            token: {
              accessToken: metadata.tokens.accessToken,
              client_id: metadata.user._id,
            },
            isAuthenticated: true,
            loading: false,
          }));
          const dataToken = {
            accessToken: metadata.tokens.accessToken,
            client_id: metadata.user._id,
          };
          localStorage.setItem("token", JSON.stringify(dataToken));
        } catch (error) {
          set({ loading: false });
          console.error("Signup failed", error);
        }
      },
      logout: async () => {
        try {
          const data = await handleLogout();
          if (data.status === 200) {
            set({
              user: {},
              token: {},
              isAuthenticated: false,
              loading: false,
            });
            localStorage.removeItem("token");
            notification.success({
              message: "Đăng xuất thành công!",
              showProgress: true,
              onClose: () => {
                window.location.reload();
              },
            });
          } else {
            notification.error({
              message: data.message,
              type: "error",
            });
          }
        } catch (error: any) {
          console.log(error)
        }
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
export default useAuthStore;
