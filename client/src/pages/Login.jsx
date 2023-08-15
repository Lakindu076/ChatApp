import React, { useState } from "react";
import vector from "../assets/login.png";
import { auth as googleAuth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { login } from "../api";
import Cookies from "js-cookie";

//This React component implements a login page with a Google Sign-In button, handling authentication and token storage using Firebase and cookies
const Login = () => {
  const [loading, setLoading] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const handleClick = () => {
    signInWithPopup(googleAuth, googleProvider).then(async (response) => {
      setLoading((prev) => true);
      const user = {
        name: response?.user?.displayName,
        email: response?.user?.email,
        avatar: response?.user?.photoURL,
      };
      try {
        const { data } = await login(user);
        setLoading((prev) => false);
        Cookies.set("accessToken", data?.tokens?.at);
        Cookies.set("refreshToken", data?.tokens?.rt);
        window.location.reload();
      } catch (error) {
        setLoading((prev) => false);
        console.log(error);
        alert("Error");
      }
    });
  };
  return (
    <div className="w-screen h-screen bg-[#FDFDFD] flex justify-center items-center p-3">
      <div className="sm:w-[500px] bg-white border p-4 rounded-md shadow-md flex justify-center items-center flex-col">
        <img src={vector} alt="hey" className="" />
        <p className="my-2 font-semibold text-xl text-center">
          Login to continue...
        </p>
        <button
          onClick={handleClick}
          className={`border w-full py-2 text-white bg-myBlueDark font-semibold rounded-md hover:opacity-80 animation ${
            loading && "cursor-not-allowed"
          } outline-none`}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
