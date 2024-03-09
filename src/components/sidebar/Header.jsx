import React from "react";
import { useSelector } from "react-redux";
import CommunityIcon from "../../svg/Community";
import ChatIcon from "../../svg/ChatIcon";
import DotsIcon from "../../svg/Dots";

const Header = () => {
  const user = useSelector((state) => state.user.user.user);
  return (
    <div>
      <div className="h-[50px] bg-dark_bg_2 flex items-center p-4">
        {/* container */}
        <div className="w-full flex items-center justify-between">
          <button>
            <img
              src={user.picture}
              alt="dp"
              className="rounded-full object-cover h-8 w-8"
            />
          </button>

          {/* right */}
          <div className="flex items-center gap-x-4">
            <div className="commumnity cursor-pointer">
              <CommunityIcon className="fill-dark_svg_1" />
            </div>
            <div className="commumnity cursor-pointer">
              <ChatIcon className="fill-dark_svg_1" />
            </div>
            <div className="commumnity cursor-pointer">
              <DotsIcon className="fill-dark_svg_1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
