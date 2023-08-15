import React, { useState } from "react";
import Message from "../components/message/Message";
import Sidebar from "../components/sidebar/Sidebar";

const Chat = () => {
  const [flag, setFlag] = useState(false);
  return (
    <>
      <div className="px-3 hidden sm:flex">
        <Sidebar flag={flag} setFlag={setFlag} />
        <Message flag={flag} setFlag={setFlag} />
      </div>
      <div className="px-3 flex sm:hidden">
        {!flag && <Sidebar flag={flag} setFlag={setFlag} />}
        {flag && <Message flag={flag} setFlag={setFlag} />}
      </div>
    </>
  );
};

export default Chat;
