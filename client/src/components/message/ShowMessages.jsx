import React, { useEffect, useRef, useState } from "react";
import { getMsgs } from "../../api";
import { myAuth, myCurrentChat } from "../../states";
import TimeAgo from 'react-timeago'


const ShowMessages = ({ scrollRef, msgs, setMsgs, socket }) => {
  const user = myAuth((state) => state.auth.user);
  const currentChat = myCurrentChat((state) => state.currentChat);
  const ref = useRef();
  const [temp, setTemp] = useState();
  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await getMsgs({ reciever: currentChat?._id });
        let msgs = data?.msgs;
        msgs.sort((a, b) => {
          let x = a.createdAt;
          let y = b.createdAt;
          if (x < y) return -1;
          if (x > y) return 1;
          return 0;
        });
        setMsgs(msgs);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [currentChat, user, temp]);

  useEffect(() => {
    if (!socket) return;
    socket.on("rec-msg", (data) => {
      setTemp(data);
    });
    return () => {
      socket.off("rec-msg", (data) => {
        setTemp(data);
      });
    };
  }, [socket]);

  useEffect(() => {
    if (ref) {
      ref.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, [ref]);

  return (
    <div
      id="show-messages"
      className={`mt-20 overflow-y-scroll scrollbar-hide`}
      style={{ height: "calc(100vh - 80px - 100px)" }}
      ref={ref}
    >
      <div
        className="px-2 sm:px-5 flex flex-col space-y-3 py-2 z-0"
        id="msg-div"
      >
        {msgs?.map((msg, index) => {
          return <Card key={index} data={msg} currentChat={currentChat} />;
        })}
      </div>
    </div>
  );
};

export default ShowMessages;

const Card = ({ data, currentChat }) => {
  return (
    <div
      className={`flex ${
        currentChat?._id === data?.reciever ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`w-[95%] md:w-[60%] p-3 ${
          currentChat?._id === data?.reciever ? "bg-myGray3" : "bg-white"
        } rounded-xl shadow-sm cursor-pointer hover:opacity-80 animation`}
      >
        {data?.msgType === "Text" && <p className="break-words">{data?.msg}</p>}
        <div className="flex justify-end">
          <TimeAgo date={data?.createdAt} className="text-xs font-[600] mt-[2px] text-gray-700" />
        </div>
      </div>
    </div>
  );
};
