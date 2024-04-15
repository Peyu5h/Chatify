import { RxCross2 } from "react-icons/rx";
import { showUserInfoAtom } from "../../atom/atom";
import { useAtom } from "jotai";

const Header = () => {
  const [showUserInfo, setShowUserInfo] = useAtom(showUserInfoAtom);

  return (
    <div>
      <div className="relative border-l-2 border-l-dark_border_1 h-[50px] bg-dark_bg_2 flex items-center p-4 px-6">
        {/* container */}
        <div className="w-full flex items-center justify-between">
          <h1>User Info</h1>
          {/* right */}
          <div className="flex items-center gap-x-4">
            <div
              onClick={() => setShowUserInfo(false)}
              className="hover:bg-dark_hover_1/50 duration-200 p-1.5 rounded-full commumnity cursor-pointer"
            >
              <RxCross2 className="fill-dark_svg_1 text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
