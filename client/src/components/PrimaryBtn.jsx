import React from "react";


const PrimaryBtn = (props) => {
  return (
    <button
      {...props}
      className={`bg-myBlueFaded text-myBlueDark font-semibold text-lg px-5 py-[0.1rem] rounded-lg flex items-center space-x-2`}
    >
      {props.children}
    </button>
  );
};

export default PrimaryBtn;
