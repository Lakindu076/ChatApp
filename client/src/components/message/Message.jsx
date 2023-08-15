import React, { useEffect, useRef, useState } from "react";
import { myActiveUsers, myAuth, myCurrentChat } from "../../states";
import { getAllUsers } from "../../api";
import MsgNavbar from "./MsgNavbar";
import io from "socket.io-client";
import Editor from "./Editor";
import ShowMessages from "./ShowMessages";

const Message = ({ flag, setFlag }) => {
  const currentChat = myCurrentChat((state) => state.currentChat);
  const setCurrentChat = myCurrentChat((state) => state.setCurrentChat);
  const user = myAuth((state) => state.auth.user);
  const [msgs, setMsgs] = useState([]);
  useEffect(() => {
    if (currentChat) return;
    async function fetch() {
      try {
        const { data } = await getAllUsers();
        let users = data.users?.filter((e) => e._id !== user._id);
        setCurrentChat(users[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);
  const ele = document.getElementById("message");
  const scrollRef = useRef();

  const [socket, setSocket] = useState();
  const setActiveUsers = myActiveUsers((state) => state.setActiveUsers);

  useEffect(() => {
    const s = io(import.meta.env.VITE_SERVER || "http://localhost:5000");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !user) return;
    socket.emit("user-online", user);
  }, [socket, user]);

  useEffect(() => {
    if (!socket) return;
    socket.on("activeUsers", (data) => {
      setActiveUsers(data);
    });
  }, [socket]);

  return (
    <>
      <div
        style={{ width: "calc(100vw - 300px - 0.75rem)" }}
        className="h-screen py-3 hidden sm:inline-flex "
      >
        <div
          className="w-full h-full bg-myGray2 rounded-lg"
          id="message"
          ref={scrollRef}
        >
          <MsgNavbar flag={flag} setFlag={setFlag} />
          <ShowMessages
            scrollRef={scrollRef}
            msgs={msgs}
            setMsgs={setMsgs}
            socket={socket}
          />
          <Editor socket={socket} msgs={msgs} setMsgs={setMsgs} />
        </div>
      </div>

      <div className="h-screen py-3 w-screen sm:hidden overflow-scroll scrollbar-hide">
        <div
          className="w-full h-full bg-myGray2 rounded-lg overflow-y-scroll scrollbar-hide"
          id="message"
          ref={scrollRef}
        >
          <MsgNavbar flag={flag} setFlag={setFlag} />
          <ShowMessages
            scrollRef={scrollRef}
            msgs={msgs}
            setMsgs={setMsgs}
            socket={socket}
          />
          <Editor socket={socket} msgs={msgs} setMsgs={setMsgs} />
        </div>
      </div>
    </>
  );
};

export default Message;
