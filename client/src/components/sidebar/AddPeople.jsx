import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import PrimaryBtn from "../PrimaryBtn";

const AddPeople = (props) => {
  if (props?.hidden) return null;
  return (
    <div className="flex justify-end items-center space-x-1 mt-3">
      <PrimaryBtn>
        <div className="h-8 w-2 flex-center-center">
          <div>
            <BsPlusLg />
          </div>
        </div>
      </PrimaryBtn>
      <button>
        <HiDotsVertical className="text-xl text-gray-500" />
      </button>
    </div>
  );
};

export default AddPeople;
