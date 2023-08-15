import axios from 'axios';
import Cookies from "js-cookie";

const at = Cookies.get("accessToken");
const rt = Cookies.get("refreshToken");

const url = import.meta.env.VITE_SERVER || "http://localhost:5000";
//It's important to ensure that your backend API endpoints are properly secured and handle the necessary authentication and authorization checks. Also, make sure to handle errors and responses appropriately in your frontend code where these functions are used.

export const login = (data) => axios.post(`${url}/api/login`, data);
export const logout = () => axios.post(`${url}/api/logout`, { at, rt });
export const updateAvatar = (data)=> axios.post(`${url}/api/update-avatar`,{...data, at, rt})
export const updateName = (data)=> axios.post(`${url}/api/update-name`,{...data, at, rt})
export const getAllUsers = ()=> axios.post(`${url}/api/all-users`,{at,rt})
export const sendMsg = (data) => axios.post(`${url}/api/send-msg`,{...data, at, rt})
export const getMsgs = (data) => axios.post(`${url}/api/get-msgs`,{...data, at, rt})