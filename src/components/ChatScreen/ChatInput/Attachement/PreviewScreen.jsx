import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { addFiles, clearFiles } from "../../../../rtk/chatSlice";
import { useSelector } from "react-redux";
import { IoAdd } from "react-icons/io5";
import { MdSend } from "react-icons/md";
import { useRef } from "react";
import { getFileType } from "../../../../utils/getFileType";
import getPreviewImg from "../../../../utils/getPreviewImg";

const PreviewScreen = () => {
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.chat);
  const clearFilesHandler = () => {
    dispatch(clearFiles());
  };
  console.log(files);

  const inputRef = useRef(null);
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

  const length = files ? files?.length - 1 : 0;

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple
        accept={`${
          files[length].type == "image"
            ? "image/png,image/jpeg,image/jpg,image/webp,image/gif,video/mp4,video/mpeg,video/avi"
            : "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/zip,application/x-rar-compressed,text/plain"
        }`}
        onChange={(e) =>
          files[length].type == "image" ? imageHandle(e) : documentHandler(e)
        }
      />
      <div className="relative py-2 w-full flex items-center justify-center">
        <div className="w-full flex flex-col items-center">
          {/* header */}
          <div className="w-full px-8 py-4 ">
            <div className="w-full flex items-center justify-between ">
              <div className=""></div>
              <div
                onClick={() => clearFilesHandler()}
                className="cursor-pointer"
              >
                <RxCross1 className="text-[22px] fill-dark_svg_1" />
              </div>
            </div>
          </div>

          {/* img preveiw */}
          <div className=" w-[60%]">
            <div className="mt-2">
              {files[length].type === "image" ? (
                <div className="flex flex-col items-center gap-y-3 mx-auto">
                  <h1 className="font-light text-[11px]">
                    {files[length]?.files.name}
                  </h1>
                  <img
                    src={files[length].imageData}
                    alt=""
                    className="mx-auto h-[374px] rounded-lg object-contain"
                  />
                </div>
              ) : (
                // Document Preview
                <div className="w-full flex flex-col items-center justify-center  h-[374px] gap-y-4">
                  <img
                    src={`${getPreviewImg(files[length]?.type)}`}
                    alt=""
                    className="w-20 h-20 object-contain"
                  />
                  <h1 className="font-light text-dark_text_2 text-[11px]">
                    {files[length]?.files.name}
                  </h1>

                  <h1 className="font-normal text-[14px] text-dark_text_2">
                    {`${(files[length]?.files.size / (1024 * 1024)).toFixed(
                      2
                    )} MB`}{" "}
                    - {files[length]?.type}
                  </h1>
                </div>
              )}
            </div>
          </div>

          {/* input */}
          <input
            // onChange={onChangeHandler}
            className="w-[55vw] mt-6 bg-dark_bg_4 py-3 pl-4 px-3 rounded-lg outline-none placeholder-dark_text_5 font-light placeholder:font-light placeholder:pl-0.5 text-dark_text_1"
            type="text"
            required
            // value={message}
            placeholder="Type a message"
            // ref={textRef}
          />

          {/* divider */}
          <div className="w-[90%] h-[0.5px] my-5 bg-dark_hover_1/70"></div>

          <div className="h-20  w-[90%] flex justify-between">
            <div className=""></div>
            <div className="addIMG">
              <div className="flex gap-x-3">
                {files[length]?.type === "image"
                  ? files.map((file, index) => (
                      <img
                        key={index}
                        src={file.imageData}
                        className={`object-cover h-14 w-14 rounded-md ${
                          index === length ? "border-blue_1 border-2" : ""
                        } cursor-pointer`}
                        alt=""
                      />
                    ))
                  : files.map((file, index) => (
                      <img
                        key={index}
                        src={getPreviewImg(file.type)}
                        className={`object-cover h-14 w-14 rounded-md  cursor-pointer`}
                        alt=""
                      />
                    ))}

                <div
                  onClick={() => inputRef.current.click()}
                  className="object-cover flex items-center justify-center h-14 w-14 rounded-md border-dashed border-white cursor-pointer border-2"
                >
                  <IoAdd className="text-2xl font-bold" />
                </div>
              </div>
            </div>

            {/* send */}
            <div className="flex items-center justify-center">
              <button className="bg-blue_1 hover:bg-blue_3 duration-200 p-4 rounded-full text-white">
                <MdSend className="h-6 w-6 " />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewScreen;
