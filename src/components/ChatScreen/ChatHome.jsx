import React from "react";
import { useSelector } from "react-redux";

const ChatHome = () => {
  const { user } = useSelector((state) => state.user.user);
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="">
        <img
          className="h-[400px] w-[400px] object-cover "
          src="https://res.cloudinary.com/dkysrpdi6/image/upload/v1710000584/hero_rcjwmm.gif"
          alt="hero"
        />
        <h1 className="text-center  mt-[-30px] flex flex-col gap-y-[14px]">
          <span className="text-xl   tracking-normal font-thin">
            Elevate Your Conversations with{" "}
            <span className="italic text-blue_1 font-normal">Chatify</span>
          </span>
          <p className="text-[15px] font-light">
            Make calls, host video chats, engage in group
            <br /> conversations, and share files securely
          </p>
        </h1>
      </div>
    </div>
  );
};

export default ChatHome;
