import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Instance {
  idInstance: string;
  apiTokenInstance: string;
}

interface AuthInstance {
  instance: Instance | null;
  setInstance: (instance: Instance) => void;
  deleteInstance: () => void;
}

export const useInstanceStore = create<AuthInstance>()(
  persist(
    (set) => ({
      instance: null,
      setInstance: (instance) => set({ instance}),
      deleteInstance: () => {
        set({ instance: null });
        useInstanceStore.persist.clearStorage();
      }
    }),
    { name: "instance" }
  )
);
