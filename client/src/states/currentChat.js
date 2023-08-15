import create from "zustand";

const state = create((set) => ({
  currentChat: null,
  setCurrentChat: (data) => set((state) => ({ currentChat: data })),
}));

export default state;
