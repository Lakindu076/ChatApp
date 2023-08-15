import React, { useState } from "react";
import Settings from "./Setting";
import ShowPeople from "./ShowPeople";
import Upper from "./Upper";

const Sidebar = ({ flag, setFlag }) => {
  const [search, setSearch] = useState("");
  const [settingFlag, setSettingFlag] = useState(false);
  return (
    <div className="h-screen w-full sm:w-[300px] py-3 px-2 overflow-y-scroll scrollbar-hide">
      <Upper
        search={search}
        setSearch={setSearch}
        setSettingFlag={setSettingFlag}
        settingFlag={settingFlag}
      />
      {!settingFlag && (
        <ShowPeople
          search={search}
          setSearch={setSearch}
          flag={flag}
          setFlag={setFlag}
        />
      )}
      {settingFlag && <Settings />}
    </div>
  );
};

export default Sidebar;
