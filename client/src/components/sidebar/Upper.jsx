import React from "react";
import logo from "../../assets/logo-lg.png";
import { myAuth } from "../../states";

import { SettingBtn } from "./Setting";
import Profile from "./Profile";
import AddPeople from "./AddPeople";

const Upper = ({ search, setSearch, settingFlag, setSettingFlag }) => {
  const user = myAuth((state) => state.auth.user);
  return (
    <div>
      <img src={logo} alt="logo" className="w-44 cursor-pointer" />
      <hr />
      <SettingBtn settingFlag={settingFlag} setSettingFlag={setSettingFlag} />
      <Profile
        settingFlag={settingFlag}
        search={search}
        setSearch={setSearch}
      />
      <AddPeople
        hidden={settingFlag && "true"}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
};

export default Upper;
