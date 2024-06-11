import React, { useEffect, useState } from "react";
import { IoIosCall } from "react-icons/io";
import { showVideoCallAtom } from "../../../atom/atom";
import { useAtom } from "jotai";

const Ringing = ({
  setIncomingCall,
  handlePickUp,
  handleDecline,
  CallerUser,
}) => {
  const [timer, setTimer] = useState(0);
  const [showVideoCall, setShowVideoCall] = useAtom(showVideoCallAtom);

  useEffect(() => {
    let interval;
    if (timer < 30) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setIncomingCall(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div>
      <div
        style={{ zIndex: 1001 }}
        className=" w-auto bg-dark_bg_4 backdrop-blur-lg fixed top-16 rounded-xl left-1/2 -translate-x-1/2"
      >
        <div className="flex items-center p-4 gap-x-4 text-dark_text_1">
          <div>
            <img
              src="https://res.cloudinary.com/dkysrpdi6/raw/upload/v1713032493/ogtaqp9yj6n0yhlvwpic.jpg"
              alt="user"
              className="w-16 h-16 rounded-full object-cover bg-dark_bg_3 flex justify-center items-center"
            />
          </div>

          <div className="info">
            <h1 className="text-[11px]">incoming video call</h1>
            <h1 className="text-sm">synix</h1>
          </div>

          <div className="btns flex gap-x-2">
            <div
              onClick={() => handlePickUp()}
              className="accept p-2 bg-emerald-500 rounded-full"
            >
              <IoIosCall className="text-2xl" />
            </div>
            <div
              onClick={() => handleDecline()}
              className="decline p-2 rot135  bg-rose-500 rounded-full"
            >
              <IoIosCall className="text-2xl" />
            </div>
          </div>
        </div>
      </div>
      <audio
        src="https://res.cloudinary.com/dkysrpdi6/video/upload/v1713179957/Discord_Original-646169_fo4fqd.mp3"
        autoPlay
        loop
      ></audio>
    </div>
  );
};

export default Ringing;
