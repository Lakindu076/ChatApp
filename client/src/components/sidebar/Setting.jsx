import React, { useState } from "react";
import { myAuth } from "../../states";
import { BiArrowBack } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { FaPencilAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { logout, updateName } from "../../api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Settings = () => {
  const auth = myAuth((state) => state.auth);
  const setAuth = myAuth((state) => state.setAuth);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-5">
      <HelperComp
        state={auth?.user?.name}
        name="Name"
        setAuth={setAuth}
        edit={true}
      />
      <HelperComp state={auth?.user?.email} name="Email" edit={false} />
      <button
        className="mt-10 bg-myBlueDark text-white font-semibold w-full py-2 rounded-lg text-lg"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

const HelperComp = ({ state, setAuth, name, edit }) => {
  const [change, setChange] = useState(state);
  const [flag, setFlag] = useState(false);
  const handleTickClick = async () => {
    if (!change || change?.lengt < 3) {
      alert("Name should be at least 3 characters!!");
      return;
    } 
    try {
      await updateName({ name: change });
      setFlag(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-2">
      <p className="text-lg text-myBlueDark font-semibold">Your {name}</p>
      <div className="flex justify-between items-center px-3">
        <input
          id="change-input"
          type="text"
          value={change}
          onChange={(e) => setChange(e.target.value)}
          className="no-outline bg-white"
          disabled={!flag}
        />
        {!flag ? (
          <div
            className={`cursor-pointer animation hover:scale-125 ${
              !edit && "hidden"
            } `}
            onClick={() => {
              setFlag(true);
              document.getElementById("change-input").focus();
            }}
          >
            <FaPencilAlt />
          </div>
        ) : (
          <div
            className={`cursor-pointer animation hover:scale-125 ${
              !edit && "hidden"
            } `}
            onClick={handleTickClick}
          >
            <TiTick className="text-2xl" />
          </div>
        )}
      </div>
      <hr className="mt-3" />
    </div>
  );
};

export const SettingBtn = ({ settingFlag, setSettingFlag }) => {
  return (
    <div className={`flex ${!settingFlag && "justify-end"} mt-2`}>
      {!settingFlag ? (
        <FiSettings
          className="text-xl text-myGray3 cursor-pointer"
          onClick={() => setSettingFlag(true)}
        />
      ) : (
        <BiArrowBack
          onClick={() => setSettingFlag(false)}
          className="text-xl text-myGray3 cursor-pointer"
        />
      )}
    </div>
  );
};

export default Settings;
