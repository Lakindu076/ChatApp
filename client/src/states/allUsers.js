import create from "zustand";
//This code snippet uses the "zustand" library to create a state store with an initial empty array for users, and it provides a function setUsers to update the state with new data for the users.
const state = create((set) => ({
  users: [],
  setUsers: (data) => set((state) => ({ users: data })),
}));

export default state;
