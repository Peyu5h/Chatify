import { useDispatch, useSelector } from "react-redux";
import DotsIcon from "../../../svg/Dots";
import SearchIcon from "../../../svg/Search";

import { IoIosArrowBack, IoIosCall } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import ClickOutside from "../../../utils/ClickOutside";
import { useEffect, useRef, useState } from "react";
import { logout } from "../../../rtk/userSlice";
import { useAtom } from "jotai";
import {
  onlineUsersAtom,
  showUserInfoAtom,
  showVideoCallAtom,
  typingUsersAtom,
} from "../../../atom/atom";
import {
  EmptyActiveConveration,
  setActiveConveration,
} from "../../../rtk/chatSlice";

const ChatPageHeader = ({ callUser, remotePeerId }) => {
  const { activeConversation, conversation } = useSelector(
    (state) => state.chat
  );
  const user = useSelector((state) => state.user.user.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const el = useRef(null);
  ClickOutside(el, () => {
    setShowMenu(false);
  });

  const [onlineUsers, setOnlineUsers] = useAtom(onlineUsersAtom);
  const receiverUser = activeConversation.users.find((u) => u._id !== user._id);

  let check = onlineUsers.find(
    (u) =>
      u.userId === activeConversation.users.find((u) => u._id !== user._id)._id
  );
  const [showVideoCall, setShowVideoCall] = useAtom(showVideoCallAtom);

  // let check = onlineUsers.find(
  //   (u) => u.userId === getConversationId(user, conversation.users)
  // );

  const [typing, setTyping] = useAtom(typingUsersAtom);
  const [showUserInfo, setShowUserInfo] = useAtom(showUserInfoAtom);

  const handleEmptyConversation = () => {
    dispatch(EmptyActiveConveration());
  };

  return (
    <div
      style={{ zIndex: 9 }}
      className="border-l-2 w-full border-l-dark_border_1 z-9"
    >
      <div className=" h-[50px] bg-dark_bg_2 flex sm:p-5 px-4 sm:py-0 py-8">
        <div className="w-full flex items-center justify-between">
          {/* LEFT */}
          <div className="nameContainer flex gap-x-3.5">
            <div
              onClick={handleEmptyConversation}
              className="backbtn flex items-center justify-center sm:hidden "
            >
              <div className="hover:bg-dark_hover_1/50 duration-200 p-1.5 rounded-full commumnity cursor-pointer">
                <IoIosArrowBack className="fill-dark_svg_2 size-5 sm:size-6" />
              </div>
            </div>
            <img
              onClick={() => setShowUserInfo(true)}
              src={receiverUser.picture}
              alt="dp"
              className="rounded-full object-cover h-9 w-9"
            />
            <div className="name flex flex-col leading-tight">
              <h1 className="sm:text-md text-[13px] font-medium">
                {receiverUser.name}
              </h1>
              <div className="flex items-center">
                {check ? (
                  <>
                    {typing ? (
                      <div className="sm:text-[11px] text-[10px] ml-[1px] text-emerald-400">
                        typing...
                      </div>
                    ) : (
                      <>
                        <div className="text-[11px] ml-[1px] text-dark_text_2">
                          online
                        </div>
                        <div className="h-1 w-1 rounded-full bg-green-500 ml-1"></div>{" "}
                      </>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center justify-center gap-x-1 sm:gap-x-4">
            <div
              onClick={async () => {
                await setShowVideoCall(true);
                await callUser(remotePeerId);
              }}
              className="hover:bg-dark_hover_1/50 duration-200 p-1.5 rounded-full commumnity cursor-pointer"
            >
              <IoVideocam className="fill-dark_svg_2 size-5 sm:size-6 " />
            </div>
            <div className="hover:bg-dark_hover_1/50 duration-200 p-1.5 rounded-full commumnity cursor-pointer">
              <IoIosCall className="fill-dark_svg_2 size-5 sm:size-6 " />
            </div>
            <div className="hover:bg-dark_hover_1/50 duration-200 p-1.5 rounded-full commumnity cursor-pointer">
              <SearchIcon className="fill-dark_svg_2 size-5 sm:size-6" />
            </div>
            <div
              onClick={() => setShowMenu(true)}
              className="hover:bg-dark_hover_1/50 duration-200 p-1.5 rounded-full commumnity cursor-pointer"
            >
              <DotsIcon className="fill-dark_svg_2 size-5 sm:size-6" />
            </div>
          </div>

          {showMenu && (
            <div
              ref={el}
              style={{ zIndex: 9 }}
              className="absolute rounded-md text-sm right-8 top-12 w-[12rem] font-light bg-dark_bg_4 z-9"
            >
              <div className="flex flex-col  my-1">
                <div
                  onClick={() => {
                    setShowUserInfo(true), setShowMenu(false);
                  }}
                  className="grp cursor-pointer duration-150 hover:bg-dark_bg_3 p-3"
                >
                  User info
                </div>
                <div
                  onClick={() => {
                    setShowMenu(false);
                  }}
                  className="grp cursor-pointer  duration-150 hover:bg-dark_bg_3 p-3"
                >
                  Mute notifications
                </div>
                <div
                  onClick={() => {
                    setShowMenu(false);
                  }}
                  className=" cursor-pointer  duration-150 hover:bg-dark_bg_3 p-3"
                >
                  Clear chats
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPageHeader;
