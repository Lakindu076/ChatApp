import React from "react";
import { FaChevronDown } from "react-icons/fa";
import PrimaryBtn from "../PrimaryBtn";
import Searchbar from "../Searchbar";
import { myAuth } from "../../states";

const Profile = ({ settingFlag, search, setSearch }) => {
  const user = myAuth((state) => state.auth.user);
  const setAuth = myAuth((state) => state.setAuth);
  // const handleAvatarChangeClick = async (e) => {};
  return (
    <div className="flex-center-center flex-col">
      <label htmlFor="avatar-upload">
        <div className="flex-center-center">
          <img
            src={user?.avatar}
            alt="avatar"
            className="w-32 rounded-full h-32 cursor-pointer"
          />
        </div>
      </label>
      {/* <input
        type="file"
        accept="image/*"
        className="hidden"
        name="file"
        id="avatar-upload"
        onChange={handleAvatarChangeClick}
      /> */}
      <p className="text-2xl mt-1 font-bold">{user?.name}</p>
      <PrimaryBtn>
        <span>available</span> <FaChevronDown className="text-sm mt-1" />
      </PrimaryBtn>
      <Searchbar
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        classes="w-full mt-4"
        hidden={settingFlag && "true"}
      />
    </div>
  );
};

export default Profile;
