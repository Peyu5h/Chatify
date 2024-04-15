import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { MdOutlineBlock } from "react-icons/md";
import { FaAngleRight, FaBookmark, FaTrash } from "react-icons/fa";

const ContactInfo = () => {
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  const receiverUser = activeConversation.users.find((u) => u._id !== user._id);

  return (
    <div className="">
      <Header />
      <div className="container flex flex-col">
        <div className="info flex flex-col justify-center items-center gap-y-3 bg-dark_bg_3 p-8">
          <img
            src={receiverUser.picture}
            alt=""
            className="w-48 h-48 object-cover rounded-full"
          />
          <div className="details mt-4 text-center flex flex-col gap-y-1">
            <h1 className="text-2xl font-light">{receiverUser.name}</h1>
            <h1 className="text-sm font-light text-dark_text_3">
              {receiverUser.email}
            </h1>
          </div>
        </div>

        <div className="info flex flex-col  items-start gap-y-1 bg-dark_bg_3 px-8 py-6 mt-4">
          <div className="text-md font-normal text-dark_text_3">About</div>
          <div className="text-md font-normal text-dark_text_1">
            {receiverUser.status}
          </div>
        </div>

        <div className="info flex flex-col  items-start gap-y-1 text-dark_text_2 bg-dark_bg_3 mt-4">
          <div className=" flex gap-x-2 items-center justify-between px-8 py-4 cursor-pointer w-full">
            <div className="flex gap-x-2 items-center">
              <FaBookmark />
              <h1>Saved messages </h1>
            </div>

            <FaAngleRight className="text-xl font-light" />
          </div>
        </div>

        <div className="info flex flex-col  items-start gap-y-1 text-error bg-dark_bg_3 mt-4">
          <div className=" flex gap-x-2 items-center justify-start px-8 py-4 cursor-pointer hover:bg-dark_bg_4 w-full">
            <MdOutlineBlock className="text-lg" />
            <h1>Block {receiverUser.name}</h1>
          </div>

          <div className=" flex gap-x-2 items-center justify-start px-8 py-4 cursor-pointer hover:bg-dark_bg_4 w-full">
            <FaTrash className="text-md" />
            <h1>Delete chats </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
