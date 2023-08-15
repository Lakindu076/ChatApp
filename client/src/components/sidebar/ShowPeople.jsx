import React, { useEffect, useState } from "react";
import { allUsers, myAuth, myCurrentChat } from "../../states";
import { getAllUsers } from '../../api'

const ShowPeople = ({ search, setSearch, flag, setFlag }) => {
  const user = myAuth((state) => state.auth.user)
  const users = allUsers(state=> state.users)
  const setUsers = allUsers(state=> state.setUsers)
  const [usersCopy,setUsersCopy] = useState([])
  useEffect(() => {
    async function fetch() {
        const { data } = await getAllUsers();
        setUsers(data?.users);
        setUsersCopy(data?.users)
    }
    fetch();
  }, []);
  useEffect(() => {
    const data = usersCopy?.filter(e=> e?.name?.toLowerCase()?.includes(search?.toLowerCase()))
    setUsers(data)
  },[search])
  return (
    <div className="flex space-y-2 flex-col mt-2">
      {users?.map((p, index) => {
        return user?._id !== p._id && <Card key={index} data={p} flag={flag} setFlag={setFlag} />;
      })}
    </div>
  );
};

const Card = (props) => {
  const { data, flag, setFlag } = props;
  const currentChat = myCurrentChat(state=> state.currentChat)
  const setCurrentChat = myCurrentChat(state=> state.setCurrentChat)
  const handleClick = () => {
    setCurrentChat(data)
    setFlag(true)
  }
  return (
    <div
      className={`flex justify-between p-3 cursor-pointer ${currentChat?._id === data?._id && "bg-hoverBg"} hover:bg-hoverBg rounded-lg border shadow-sm`}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-2">
        <img
          src={data?.avatar}
          alt=""
          className="w-14 h-14 rounded-full border"
        />
        <div>
          <p className="text-lg font-[800] capitalize">{data?.name}</p>
          <p className="text-gray-700">{data?.msg}</p>
        </div>
      </div>
      <p>{data?.time}</p>
    </div>
  );
};

export default ShowPeople;
