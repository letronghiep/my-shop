import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

const getUrlSearch = () => {
  return window.location.search.slice(1);
};

const persistentStorage: StateStorage = {
  getItem: (key): string => {
    if (getUrlSearch()) {
      const searchParams = new URLSearchParams(getUrlSearch());
      const storeValue = searchParams.get(key);
      return JSON.parse(storeValue as string);
    } else {
      return JSON.parse(localStorage.getItem(key) as string);
    }
  },
  setItem: (key, newValue): void => {
    if (getUrlSearch()) {
      const searchParams = new URLSearchParams(getUrlSearch());
      searchParams.set(key, JSON.stringify(newValue));
      window.history.replaceState(null, "", `?${searchParams.toString()}`);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(getUrlSearch());
    searchParams.delete(key);
    window.location.search = searchParams.toString();
  },
};

type LocalAndUrlStore = {
  // using create parameter and func for url
};
const storageOptions = {
  name: "LocalAndUrlStore",
  storage: createJSONStorage<LocalAndUrlStore>(() => persistentStorage),
};

const useLocalAndUrlStore = create(
  persist<LocalAndUrlStore>(
    (set) => ({
      // using create parameter and func for local
    }),
    storageOptions
  )
);
export default useLocalAndUrlStore;
