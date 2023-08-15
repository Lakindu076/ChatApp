import create from "zustand";
//isAuth (representing authentication status) and user (representing the user data), and it offers a function setAuth to update the authentication state with new data.
const state = create((set) => ({
  auth: {
    isAuth: false,
    user: null,
  },
  setAuth: (data) => set((state) => ({ auth: data })),
}));

export default state;
