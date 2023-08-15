import { myAuth } from "../states";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const setAuth = myAuth((state) => state.setAuth);
  const refreshToken = Cookies.get("refreshToken");
  useEffect(() => {
    (async () => {
      try {
        const url = import.meta.env.VITE_SERVER || "http://localhost:5000";
        const { data } = await axios.post(`${url}/api/refresh`, { 
          rt: refreshToken,
        });
        setAuth({
          isAuth: true,
          user: data?.user,
        });
        Cookies.set("accessToken", data?.tokens?.at, { expires: 1 });
        Cookies.set("refreshToken", data?.tokens?.rt, { expires: 7 });
        setLoading(false);
      } catch (error) {
        console.log('works here')
        console.log(error);
        setLoading(false);
      }
    })();
  }, []);
  return loading;
};
