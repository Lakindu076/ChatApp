import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { myActiveUsers, myAuth, myCurrentChat } from "../../states";

const MsgNavbar = ({ flag, setFlag }) => {
  const currentChat = myCurrentChat((state) => state.currentChat);
  const activeUsers = myActiveUsers((state) => state.activeUsers);
  const user = myAuth((state) => state.auth.user);
  const [status, setStatus] = useState("Offline");
  useEffect(() => {
    const find = activeUsers?.find((e) => e?.user?._id === currentChat?._id);
    if (find) setStatus("Online");
    else setStatus("Offline");
  }, [activeUsers, currentChat, user]);
  return (
    <>
      <div
        className="px-5 hidden sm:flex items-center space-x-3 shadow-md fixed faded-bg h-20 rounded-lg z-10"
        style={{ width: "calc(100vw - 300px - 0.75rem)" }}
      >
        <img
          src={currentChat?.avatar}
          alt="avatar"
          className="w-14 h-14 rounded-full cursor-pointer"
        />
        <div className="flex flex-col justify-center">
          <p className="text-lg font-semibold">{currentChat?.name}</p>
          <p>{status}</p>
        </div>
      </div>
      <div
        className="px-5 flex sm:hidden items-center space-x-3 shadow-md fixed faded-bg h-20 rounded-lg z-10"
        style={{ width: "calc(100vw - 2*0.75rem)" }}
      >
        <div onClick={() => setFlag(false)}>
          <BiArrowBack className="text-2xl cursor-pointer" />
        </div>
        <img
          src={currentChat?.avatar}
          alt="avatar"
          className="w-14 h-14 rounded-full cursor-pointer"
        />
        <div className="flex flex-col justify-center">
          <p className="text-lg font-semibold">{currentChat?.name}</p>
          <p>{status}</p>
        </div>
      </div>
    </>
  );
};

export default MsgNavbar;
