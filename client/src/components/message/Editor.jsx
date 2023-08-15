import React, { useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { IoIosSend } from "react-icons/io";
import { myAuth, myCurrentChat } from "../../states";
import { sendMsg as sendMSG } from '../../api'

const Editor = ({ msgs, setMsgs, socket }) => {
  const [msg, setMsg] = useState("");
  const currentChat = myCurrentChat(state=> state.currentChat);
  const user = myAuth(state=> state.auth.user);
  const sendMsg = async (e) => {
    if(!msg || !socket)return
    if((e.type === "keypress" && e.key === "Enter") || e.type === "click"){
        socket.emit("send-msg",{sender: user?._id, reciever: currentChat?._id, msgType: "Text", msg})
        try {
            const { data } = await sendMSG({reciever: currentChat?._id, msg, msgType: "Text"})
            setMsg("")
            setMsgs(prev=> [...prev,{ sender: user?._id, reciever: currentChat?._id, msgType: "Text", msg, createdAt: Date.now() }])
        } catch (error) {
            console.log(error)
        }
    }
  };
  return (
    <>
      <div
        className="absolute bottom-[11px] pb-2 rounded-lg bg-myGray2 hidden sm:block"
        style={{ width: "calc(100vw - 300px - 0.9rem)" }}
      >
        <div className="mx-5 bg-white h-16 rounded-xl py-3 px-5 flex justify-between space-x-3 items-center shadow-lg ">
          <textarea
            type="text"
            placeholder="Write your message..."
            className="w-full text-lg no-outline"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyPress={sendMsg}
            style={{resize: 'none'}}
          />
          <div className="flex items-center space-x-2">
            <div>
              <FiPaperclip className="text-2xl cursor-pointer animation hover:scale-125 opacity-60" />
            </div>
            <button
              className="h-10 w-12 bg-myBlueDark flex-center-center rounded-lg"
              onClick={sendMsg}
            >
              <div>
                <IoIosSend className="text-2xl text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-[11px] pb-2 rounded-lg bg-myGray2 sm:hidden "
        style={{ width: "calc(100vw - 1.5rem)" }}
      >
        <div className="mx-2 sm:mx-5 bg-white h-16 rounded-xl py-3 px-5 flex justify-between space-x-3 items-center shadow-lg ">
          <input
            type="text"
            placeholder="Write your message..."
            className="w-full text-lg no-outline"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyPress={sendMsg}
          />
          <div className="flex items-center space-x-2">
            <div>
              <FiPaperclip className="text-2xl cursor-pointer animation hover:scale-125 opacity-60" />
            </div>
            <button
              className="h-10 w-12 bg-myBlueDark flex-center-center rounded-lg"
              onClick={sendMsg}
            >
              <div>
                <IoIosSend className="text-2xl text-white" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
