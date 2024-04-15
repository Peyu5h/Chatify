import React from "react";
import { FaVideo, FaVideoSlash } from "react-icons/fa";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { IoIosCall, IoMdMic, IoMdMicOff } from "react-icons/io";

const CallFooter = () => {
  return (
    <div>
      <div className="w-full px-4 pb-3 pt-1 bg-dark_bg_2 flex flex-col rounded-t-2xl rounded-b-lg">
        <div className="splitter mx-auto h-[0.7px] w-12 bg-white rounded-l-full rounded-r-full"></div>
        <div className="icons flex justify-between items-center px-4 text-[22px] mb-4 mt-6">
          <div className="speaker p-3 bg-dark_bg_3 rounded-full">
            <HiSpeakerWave />
            {/* <HiSpeakerXMark /> */}
          </div>

          <div className="video  p-3 bg-dark_bg_3 rounded-full">
            <FaVideo />
            {/* <FaVideoSlash /> */}
          </div>

          <div className="mic  p-3 bg-dark_bg_3 rounded-full">
            <IoMdMic />
            {/* <IoMdMicOff />  */}
          </div>

          <div className="decline p-2 w-auto bg-rose-500 rounded-full">
            <IoIosCall className="text-2xl rot135 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallFooter;
