import moment from "moment";
import SeenIcon from "../../../svg/Seen";
import getPreviewImg from "../../../utils/getPreviewImg";
import { HiDownload } from "react-icons/hi";
import useDownloader from "react-use-downloader";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import GridImageSlider from "./GridImageSlider";

const Messages = ({ messages, me, imageLoaded }) => {
  const { download } = useDownloader();

  const bytesToMB = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

  const [previewImg, setPreviewImg] = useState(false);
  const [ImagesDisplay, setImagesDisplay] = useState([]);

  return (
    <div>
      {previewImg && (
        <div className="fixed inset-0 h-screen w-auto bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div
            onClick={() => {
              setPreviewImg(false);
              setImagesDisplay("");
            }}
            className="absolute cursor-pointer hover:bg-blue_3 duration-200 top-16 right-24 crossBtn h-16 w-16 flex items-center justify-center rounded-full bg-blue_4"
          >
            <RxCross2 className="text-2xl" />
          </div>
          {ImagesDisplay ? (
            <div className="h-[75vh]">
              {ImagesDisplay.map((imageArray, outerIndex) => (
                <div key={outerIndex} className="flex">
                  {Array.isArray(imageArray) ? (
                    // grid images
                    <GridImageSlider images={ImagesDisplay} />
                  ) : (
                    //  single Image
                    <div className="h-[75vh]">
                      <img
                        className="object-contain h-[100%] w-[100%] rounded-md cursor-pointer"
                        src={imageArray.file.secure_url}
                        alt=""
                        onClick={() => {
                          setPreviewImg(true);
                          setImagesDisplay([imageArray]);
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
      <div
        className={`w-full flex mt-2 space-x-3 max-w-[416px] ${
          me ? "ml-auto justify-end" : ""
        }`}
      >
        <div>
          <div
            className={`relative text-[14px] h-full text-dark_text_1 ${
              messages.message.length > 0 ? "p-2.5" : "p-0.5"
            }
              ${
                messages.files.length !== 0 && messages.message.length > 0
                  ? "px-0.5 pt-0.5 "
                  : ""
              }
             rounded-b-lg   ${
               me ? "bg-blue_3 rounded-l-lg" : "bg-dark_bg_4 rounded-r-lg"
             }`}
          >
            <div
              className={` h-4 w-3 absolute top-[0px] ${
                me
                  ? " triangle-right bg-blue_3  right-[-11px]"
                  : "triangle-left bg-dark_bg_4 left-[-11px]"
              } `}
            ></div>

            {messages.files.length !== 0 ? (
              // FOR IMAGE
              <>
                {messages.files[0].type == "image" ? (
                  // img
                  messages.files.length > 3 ? (
                    // four grid images
                    <div
                      onClick={() => {
                        setPreviewImg(true);
                        setImagesDisplay([messages.files]);
                      }}
                      className="w-[300px] h-[300px] grid grid-cols-2 grid-rows-2 gap-0.5 cursor-pointer"
                    >
                      <img
                        src={messages.files[0].file.secure_url}
                        className="w-[150px] h-[150px] object-cover rounded-md"
                        alt=""
                      />
                      <img
                        src={messages.files[1].file.secure_url}
                        className="w-[150px] h-[150px] object-cover rounded-md"
                        alt=""
                      />
                      <img
                        src={messages.files[2].file.secure_url}
                        className="w-[150px] h-[150px] object-cover rounded-md"
                        alt=""
                      />
                      <div className="relative">
                        {messages.files.length - 4 !== 0 && (
                          <div className="absolute inset-0 bg-black/40 hover:bg-black/50 duration-200 flex justify-center items-center">
                            <h1 className="text-white text-lg">
                              +{messages.files.length - 4}
                            </h1>
                          </div>
                        )}

                        <img
                          src={messages.files[3].file.secure_url}
                          className="w-[150px] h-[150px] object-cover rounded-md"
                          alt=""
                        />
                      </div>
                    </div>
                  ) : imageLoaded === false ? (
                    messages.message.length == 0 ? (
                      messages.files.map((file, index) => (
                        <img
                          onClick={() => {
                            setPreviewImg(true);

                            setImagesDisplay([file]);
                          }}
                          key={index}
                          src={file.file.secure_url}
                          className={`${
                            messages.files.length > 1 ? "mb-1" : "mt-0"
                          } h-auto max-w-[300px] object-cover rounded-md cursor-pointer`}
                          alt=""
                        />
                      ))
                    ) : (
                      <>
                        <img
                          src={messages.files[0].file.secure_url}
                          className="h-auto max-w-[300px] object-cover rounded-md cursor-pointer"
                          alt=""
                        />
                        <h1 className="my-2 ml-2">{messages.message}</h1>
                      </>
                    )
                  ) : (
                    <div className="h-[300px] w-[300px] animate-pulse bg-black/20"></div>
                  )
                ) : messages.files[0].type == "VIDEO" ? (
                  imageLoaded === false ? (
                    <div className="m-0.5 rounded-md overflow-hidden bg-black">
                      <ReactPlayer
                        // light={true}
                        autoplay={true}
                        muted={true}
                        // loop={true}
                        // playing={true}
                        url={messages.files[0].file.secure_url}
                        controls
                        width="300px"
                        height="auto"
                      />
                    </div>
                  ) : (
                    <div className="h-[200px] w-[300px] animate-pulse bg-black/20"></div>
                  )
                ) : // Other fileTypes
                messages.message.length == 0 ? (
                  messages.files.map((file, index) => (
                    <div className="" key={index}>
                      <div className="h-20 w-[300px] bg-opacity-25 bg-black mb-6 rounded-lg p-4 flex  justify-between items-center">
                        <div className="flex gap-x-2">
                          <img
                            src={getPreviewImg(file.type)}
                            className="w-10 h-10"
                            alt=""
                          />

                          <div className="description">
                            <h1 className="text-dark_text_1 text-sm">
                              {file?.file?.original_filename &&
                                `${file?.file?.original_filename}.${
                                  file?.file?.public_id.split(".")[1]
                                }`}
                            </h1>
                            <h1 className="text-dark_text_2 text-xs">
                              {`${bytesToMB(file.file.bytes)} MB`} - {file.type}
                            </h1>
                          </div>
                        </div>

                        {/* download Button */}
                        <div
                          onClick={() =>
                            download(
                              file.file.secure_url,
                              `${file.file.original_filename}.${
                                file?.file?.public_id.split(".")[1]
                              }`
                            )
                          }
                          className="p-2 border-2 rounded-full cursor-pointer border-dark_svg_1"
                        >
                          <HiDownload className="text-xl text-dark_svg_1" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    {messages.files.map((file, index) => (
                      <div className="" key={index}>
                        <div className="h-20 w-[300px] bg-opacity-25 bg-black mb-2 rounded-lg p-4 flex  justify-between items-center">
                          <div className="flex gap-x-2">
                            <img
                              src={getPreviewImg(file.type)}
                              className="w-10 h-10"
                              alt=""
                            />

                            <div className="description">
                              <h1 className="text-dark_text_1 text-sm">
                                {file?.file?.original_filename &&
                                  `${file?.file?.original_filename}.${
                                    file?.file?.public_id.split(".")[1]
                                  }`}
                              </h1>
                              <h1 className="text-dark_text_2 text-xs">
                                {`${bytesToMB(file.file.bytes)} MB`} -{" "}
                                {file.type}
                              </h1>
                            </div>
                          </div>

                          {/* download Button */}
                          <div
                            onClick={() =>
                              download(
                                file.file.secure_url,
                                `${file.file.original_filename}.${
                                  file?.file?.public_id.split(".")[1]
                                }`
                              )
                            }
                            className="p-2 border-2 rounded-full cursor-pointer border-dark_svg_1"
                          >
                            <HiDownload className="text-xl text-dark_svg_1" />
                          </div>
                        </div>
                      </div>
                    ))}
                    <h1 className=" ml-2">{messages.message}</h1>
                  </>
                )}
              </>
            ) : (
              <>
                <p
                  className={` ${
                    messages.message.length > 60 ? "mr-0 mb-1" : "mr-[4.5rem]"
                  }`}
                >
                  {messages.message}
                </p>
              </>
            )}
            {messages.files.length < 2 ||
            messages.files[0]?.type !== "image" ? (
              <p
                className={`absolute flex gap-x-1 text-[11px] right-1 ${
                  messages.message.length > 0 ? "bottom-[-4px]" : "bottom-0"
                } m-1 text-dark_text_4/80`}
              >
                {moment(messages.createdAt).format("h:mm A")}
                {me && <SeenIcon className="fill-blue-300 " />}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
