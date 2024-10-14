import { IUser } from "@/types/global";
import create from "zustand";
import type { StateCreator } from "zustand";

const sliceResetFns = new Set<() => void>();

export const resetAllSlices = () => {
  sliceResetFns.forEach((resetFn) => {
    resetFn();
  });
};

const initialUserState = {
  user: null,
  accessToken: "",
  rol_name: "",
};

interface UserSlice {
  user: IUser | null;
  accessToken: string;
  rol_name: string;
}

const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => {
  sliceResetFns.add(() => set(initialUserState));
  return {
    ...initialUserState,
    setUser: () => set((state) => ({ user: state.user })),
    setAccessToken: () => set((state) => ({ accessToken: state.accessToken })),
    setRolName: () => set((state) => ({ rol_name: state.rol_name })),
  };
};
const useBoundStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a),
}));

export default useBoundStore;
