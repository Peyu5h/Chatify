import { useRef } from "react";
import { IoIosDocument, IoMdPhotos } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../../rtk/chatSlice";
import { useSelector } from "react-redux";
import { getFileType } from "../../../../utils/getFileType";

const Documents = () => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const fileData = useSelector((state) => state.chat.files);

  const documentHandler = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      if (
        file.type !== "application/pdf" &&
        file.type !== "application/msword" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        file.type !== "application/vnd.ms-excel" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.type !== "application/vnd.ms-powerpoint" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
        file.type !== "application/zip" &&
        file.type !== "application/x-rar-compressed" &&
        file.type !== "text/plain"
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
        accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/zip,application/x-rar-compressed,text/plain"
        onChange={(e) => documentHandler(e)}
      />
      <div
        onClick={() => inputRef.current.click()}
        className="document flex items-center gap-x-3 px-3 py-3 hover:bg-dark_bg_3/50 rounded-lg cursor-pointer"
      >
        <div className="document flex items-center gap-x-3  hover:bg-dark_bg_3/50 rounded-lg cursor-pointer">
          <IoIosDocument className="fill-yellow-500 text-2xl cursor-pointer" />
          <p className="">Documents</p>
        </div>
      </div>
    </div>
  );
};

export default Documents;
