import { create } from "zustand"
import { createJSONStorage, devtools, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

import { zustandStorage } from "@/libs/storage"

interface State {
  status: "idle" | "authenticated" | "unauthenticated"
}

interface Actions {
  login: () => void
  logout: () => void
}

const initialState: State = {
  status: "idle",
}

export const useAuthStore = create<State & Actions>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialState,
        login: () => set({ status: "authenticated" }),
        logout: () => set({ status: "unauthenticated" }),
      })),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => zustandStorage),
      },
    ),
  ),
)
