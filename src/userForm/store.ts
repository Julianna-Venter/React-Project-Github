import { create } from "zustand";

type UserStore = {
  bookmarked: string;
  users: string[];
  setBookmarked: (bookmarked: string) => void;
  removeBookmarked: () => void;
  addUser: (user: string) => void;
  removeUser: (user: string) => void;
  isBookmarked: (user: string) => boolean;
};

export const useUserStore = create<UserStore>((set, get) => ({
  bookmarked: localStorage.getItem("bookmarked") || "",
  users: JSON.parse(localStorage.getItem("users") || "[]"),

  setBookmarked: (bookmarked) => {
    set({ bookmarked });
    localStorage.setItem("bookmarked", bookmarked);
  },

  removeBookmarked: () => {
    set({ bookmarked: "" });
    localStorage.removeItem("bookmarked");
  },

  addUser: (user) => {
    set((state) => {
      const userExists =
        state.users.includes(user) || state.bookmarked === user;
      if (!userExists) {
        const updatedUsers = [...state.users, user];
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        return { users: updatedUsers };
      }
      return state;
    });
  },

  removeUser: (user) => {
    set((state) => {
      const updatedUsers = state.users.filter(
        (existingUser) => existingUser !== user
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return { users: updatedUsers };
    });
  },

  isBookmarked: (user) => {
    const { bookmarked } = get();
    return user === bookmarked;
  },
}));
