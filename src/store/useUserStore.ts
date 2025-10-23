import { create } from "zustand";
import type { User } from "../types";

interface UserStoreState {
  activeUsers: User[];
  archivedUsers: User[];
  setInitialUsers: (users: User[]) => void;
  archiveUser: (id: number) => void;
  hideUser: (id: number) => void;
  unarchiveUser: (id: number) => void;
  updateUser: (id: number, data: Partial<User>) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  activeUsers: [],
  archivedUsers: [],
  hideUser: (id) =>
    set((state) => ({
      activeUsers: state.activeUsers.filter((u) => u.id !== id),
    })),
    updateUser: (id, data) =>
  set((state) => ({
    activeUsers: state.activeUsers.map(u => u.id === id ? { ...u, ...data } : u),
    archivedUsers: state.archivedUsers.map(u => u.id === id ? { ...u, ...data } : u),
  })),
  unarchiveUser: (id) =>
    set((state) => {
      const user = state.archivedUsers.find((u) => u.id === id);
      if (!user) return state;
      return {
        archivedUsers: state.archivedUsers.filter((u) => u.id !== id),
        activeUsers: [...state.activeUsers, user],
      };
    }),
  setInitialUsers: (users) => set({ activeUsers: users, archivedUsers: [] }),
  archiveUser: (id) =>
    set((state) => {
      const user = state.activeUsers.find((u) => u.id === id);
      if (!user) return state;
      return {
        activeUsers: state.activeUsers.filter((u) => u.id !== id),
        archivedUsers: [...state.archivedUsers, user],
      };
    }),
}));
