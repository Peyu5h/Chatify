import React, { useState } from "react";
import Ringing from "./Ringing";
import Header from "../../sidebar/Header";
import CallHeader from "./CallHeader";
import CallFooter from "./CallFooter";

const Call = ({ call, setCall, callAccepted, myVideo, userVideo, stream }) => {
  const { receivingCall, callEnded } = call;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative">
      <div
        style={{ zIndex: 1000 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`z-9  overflow-hidden w-[20rem] h-[32rem]  bg-dark_bg_4 flex flex-col justify-between fixed top-16 rounded-xl left-1/2 -translate-x-1/2 text-dark_text_1`}
      >
        <div
          style={{
            zIndex: 10,
          }}
          className="p-4"
        >
          <CallHeader name="Piyush Bagul" />
        </div>

        {/* video Stream */}

        {/* uservideo */}
        <div className="videoStream relative">
          <div
            className="fixed top-0 left-0 w-full h-full bg-yellow-500 rounded-lg"
            style={{
              zIndex: 2,
            }}
          >
            <video
              ref={userVideo}
              muted
              autoPlay
              playsInline
              className="w-full h-full object-cover "
            ></video>
          </div>
          {/* myvideo */}

          <div className="">
            <video
              ref={myVideo}
              muted
              autoPlay
              playsInline
              className={`SmallVideoCall rounded-lg fixed ${
                isHovered ? "moveVideoCall" : ""
              }`}
            ></video>
          </div>
        </div>
        {isHovered && (
          <div style={{ zIndex: 8 }} className="footer duration-200 ">
            <CallFooter />
          </div>
        )}
      </div>

      {/* ring */}
      {receivingCall && !callAccepted && (
        <Ringing call={call} setCall={setCall} />
      )}
    </div>
  );
};

export default Call;
