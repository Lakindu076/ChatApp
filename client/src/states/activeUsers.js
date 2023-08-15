import create from "zustand";
//This code snippet utilizes the "zustand" library to create a state management store with an initial empty array for activeUsers, and provides a function setActiveUsers to update the state with new data.

const state = create((set) => ({
  activeUsers: [],
  setActiveUsers: (data) => set((state) => ({ activeUsers: data })),
}));

export default state;
