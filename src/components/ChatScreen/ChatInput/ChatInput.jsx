import React, { useRef, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { TiMicrophone } from "react-icons/ti";
import { ClipLoader } from "react-spinners";
import { useAtom } from "jotai";
import { messageAtom } from "../../../atom/atom";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../rtk/chatSlice";
import EmojiIcon from "../../../svg/Emoji";
import AttachmentIcon from "../../../svg/AttachmentIcon";
import SendIcon from "../../../svg/Send";
import MessageInput from "./MessageInput";
import EmojiPickerApp from "./EmojiPicker";
import AttachmentMenu from "./AttachmentMenu";
import SocketContext from "../../../context/SocketContext";

const ChatInput = ({ socket }) => {
  const [message, setMessage] = useAtom(messageAtom);
  const [loading, setLoading] = useState(false);
  const [isEmojiOpen, setisEmojiOpen] = useState(false);
  const [isAttachmentOpen, setisAttachmentOpen] = useState(false);
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user.user);
  const { token } = user;
  const dispatch = useDispatch();
  const textRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const values = {
      message,
      convo_id: activeConversation?._id,
      files: [],
      token,
    };
    const newMsg = await dispatch(sendMessage(values));
    await socket.emit("send_message", newMsg.payload);
    setMessage("");
    setLoading(false);
  };

  const handleEmojiClick = (emojiObject, event) => {
    const { emoji } = emojiObject;
    setMessage((prevMessage) => prevMessage + emoji);
    const newCursorPosition = textRef.current.value.length + emoji.length;
    textRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
  };

  const handleOpenEmoji = () => {
    setisEmojiOpen(!isEmojiOpen);
    setisAttachmentOpen(false);
  };

  const handleOpenAttachment = () => {
    setisAttachmentOpen(!isAttachmentOpen);
    setisEmojiOpen(false);
  };

  const handleClick = (e) => {
    // Check if the click target is not the emoji icon
    if (!e.target.closest(".emoji-icon")) {
      textRef.current.focus();
    }
  };

  return (
    <div onClick={handleClick}>
      {isAttachmentOpen && (
        <AttachmentMenu
          isopen={isAttachmentOpen}
          setIsOpen={setisAttachmentOpen}
        />
      )}
      <div className="absolute bottom-0 h-16 flex justify-between items-center px-4 bg-dark_bg_4 w-full gap-x-5 ">
        <div
          onClick={() => handleOpenAttachment()}
          className={`hover:bg-dark_hover_1/50 ${
            isAttachmentOpen ? "bg-dark_hover_1/50 duration-200 p-2" : "p-2.5"
          } duration-200  rounded-full commumnity cursor-pointer`}
        >
          {isAttachmentOpen ? (
            <IoIosAdd className="fill-dark_svg_1/50 text-[27px] cursor-pointer rotate-45  " />
          ) : (
            <AttachmentIcon className="fill-dark_svg_1/50 cursor-pointer" />
          )}
        </div>
        <div className="flex-grow flex items-center rounded-lg gap-x-3 p-3 bg-dark_border_2/80 h-10 relative cursor-text">
          <div
            onClick={() => handleOpenEmoji()}
            className="cursor-pointer emoji-icon"
          >
            <EmojiIcon
              className={`${
                isEmojiOpen ? "fill-emerald-500" : "fill-dark_svg_1/50"
              }`}
            />
          </div>
          <EmojiPickerApp
            isopen={isEmojiOpen}
            setisopen={setisEmojiOpen}
            textRef={textRef}
            onEmojiClick={handleEmojiClick}
          />
          <MessageInput
            handleSubmit={handleSubmit}
            textRef={textRef}
            className="flex-grow w-full focus:outline-none"
          />
        </div>
        <div>
          {message.length === 0 ? (
            <TiMicrophone className="fill-dark_svg_1/50 cursor-pointer text-[26px]" />
          ) : (
            message.length > 0 && (
              <div onClick={(e) => handleSubmit(e)}>
                {loading ? (
                  <ClipLoader color="#3B82F6" size={24} />
                ) : (
                  <SendIcon className="fill-dark_svg_1/50 cursor-pointer" />
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

const ChatInputWithSocket = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <ChatInput {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
};

export default ChatInputWithSocket;
