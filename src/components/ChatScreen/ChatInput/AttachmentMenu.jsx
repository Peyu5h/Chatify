import { FaCamera } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { IoIosDocument } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import ClickOutside from "../../../utils/ClickOutside";
import { useRef } from "react";

const AttachmentMenu = ({ setIsOpen }) => {
  const el = useRef(null);
  ClickOutside(el, () => {
    setIsOpen(false);
  });
  return (
    <div>
      <div
        ref={el}
        className="absolute openAnimation bg-dark_bg_4 left-4 bottom-[4.7rem] p-3 rounded-lg"
      >
        <div className="document flex items-center gap-x-3 px-3 py-3 hover:bg-dark_bg_3/50 rounded-lg cursor-pointer">
          <FaCamera className="fill-rose-600 text-xl cursor-pointer" />
          <p className="">Camera</p>
        </div>
        <div className="document flex items-center gap-x-3 px-3 py-3 hover:bg-dark_bg_3/50 rounded-lg cursor-pointer">
          <IoMdPhotos className="fill-blue-500 text-2xl cursor-pointer" />
          <p className="">Photos & Videos</p>
        </div>

        <div className="document flex items-center gap-x-3 px-3 py-3 hover:bg-dark_bg_3/50 rounded-lg cursor-pointer">
          <IoIosDocument className="fill-yellow-500 text-2xl cursor-pointer" />
          <p className="">Documents</p>
        </div>

        <div className="document flex items-center gap-x-3 px-3 py-3 hover:bg-dark_bg_3/50 rounded-lg cursor-pointer">
          <IoPerson className="text-teal-500 text-2xl cursor-pointer" />
          <p className="">Contact</p>
        </div>
      </div>
    </div>
  );
};

export default AttachmentMenu;
