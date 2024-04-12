import { useRef } from "react";
import { IoMdPhotos } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../rtk/chatSlice";
import { useSelector } from "react-redux";
import { getFileType } from "../../../../utils/getFileType";

const PhotoVideos = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const fileData = useSelector((state) => state.chat.files);

  const imageHandle = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/jpg" &&
        file.type !== "image/gif" &&
        file.type !== "video/mp4" &&
        file.type !== "video/mpeg" &&
        file.type !== "video/avi" &&
        file.type !== "image/webp"
      ) {
        files = files.filter((file) => file !== file);
        return;
      } else if (file.size > 1024 * 1024 * 25) {
        files = files.filter((file) => file !== file);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          dispatch(
            addFiles({
              files: file,
              imageData: e.target.result,
              type: getFileType(file.type),
            })
          );
        };
      }
    });
  };
  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple
        accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,video/mp4,video/mpeg,video/avi"
        onChange={(e) => imageHandle(e)}
      />
      <div
        onClick={() => inputRef.current.click()}
        className="document flex items-center gap-x-3 px-3 py-3 hover:bg-dark_bg_3/50 rounded-lg cursor-pointer"
      >
        <div className="document flex items-center gap-x-3 hover:bg-dark_bg_3/50 rounded-lg cursor-pointer">
          <IoMdPhotos className="fill-blue-500 text-2xl cursor-pointer" />
          <p className="">Photos & Videos</p>
        </div>
      </div>
    </div>
  );
};

export default PhotoVideos;
