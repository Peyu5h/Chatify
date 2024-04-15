import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommunityIcon from "../../svg/Community";
import ChatIcon from "../../svg/ChatIcon";
import DotsIcon from "../../svg/Dots";
import { logout } from "../../rtk/userSlice";
import ClickOutside from "../../utils/ClickOutside";
import { showProfileInfoAtom } from "../../atom/atom";
import { useAtom } from "jotai";

const Header = () => {
  const user = useSelector((state) => state.user.user.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const el = useRef(null);
  ClickOutside(el, () => {
    setShowMenu(false);
  });
  const [showUserProfile, setShowUserProfile] = useAtom(showProfileInfoAtom);
  return (
    <div>
      <div className="relative h-[50px] bg-dark_bg_2 flex items-center p-4">
        {/* container */}
        <div className="w-full flex items-center justify-between">
          <button onClick={() => setShowUserProfile(true)}>
            <img
              src={user.picture}
              alt="dp"
              className="rounded-full object-cover h-8 w-8"
            />
          </button>
          {/* right */}
          <div className="flex items-center gap-x-4">
            <div className="hover:bg-dark_hover_1/50 duration-200 p-1.5 rounded-full commumnity cursor-pointer">
              <CommunityIcon className="fill-dark_svg_1" />
            </div>
            <div className="hover:bg-dark_hover_1/50 duration-200 p-1.5 rounded-full commumnity cursor-pointer">
              <ChatIcon className="fill-dark_svg_1" />
            </div>
            <div
              onClick={() => setShowMenu(!showMenu)}
              className="hover:bg-dark_hover_1/50 duration-200 p-1.5 rounded-full commumnity cursor-pointer"
            >
              <DotsIcon className="fill-dark_svg_1" />
            </div>
          </div>
          {showMenu && (
            <div
              ref={el}
              style={{ zIndex: 9 }}
              className="absolute rounded-md text-sm right-8 top-12 w-[12rem]  bg-dark_bg_4 z-9"
            >
              <div className="flex flex-col  my-1">
                <div
                  onClick={() => setShowUserProfile(true)}
                  className="grp cursor-pointer duration-150 hover:bg-dark_bg_3 p-3"
                >
                  My Profile
                </div>
                <div className="grp cursor-pointer  duration-150 hover:bg-dark_bg_3 p-3">
                  New Group
                </div>
                <div
                  onClick={() => dispatch(logout())}
                  className=" cursor-pointer  duration-150 hover:bg-dark_bg_3 p-3"
                >
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
