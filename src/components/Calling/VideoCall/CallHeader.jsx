import React from "react";
import { FaLock } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { MdGroupAdd } from "react-icons/md";

const CallHeader = ({ name }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="back cursor-pointer p-2 rounded-full duration-200 hover:bg-dark_bg_3">
          <IoIosArrowBack className="text-lg" />
        </div>
        <div className="cursor-pointer p-2">
          <MdGroupAdd className="text-xl " />
        </div>
      </div>

      <div className="flex flex-col text-center justify-center mt-2 gap-x-2">
        <div className="name">
          <h1 className="text-2xl">{name}</h1>
        </div>
        <div className="status">
          <h1 className="font-light text-sm">Ringing...</h1>
        </div>
      </div>
    </div>
  );
};

export default CallHeader;
