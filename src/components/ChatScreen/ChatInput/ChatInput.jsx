import SendIcon from "../../../svg/Send";
import AttachmentIcon from "../../../svg/AttachmentIcon";
import EmojiIcon from "../../../svg/Emoji";
import MessageInput from "./MessageInput";
import { useAtom } from "jotai";
import { messageAtom } from "../../../atom/atom";
import { TiMicrophone } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../rtk/chatSlice";
import { ClipLoader } from "react-spinners";
import EmojiPickerApp from "./EmojiPicker";
import { useRef, useState } from "react";

const ChatInput = () => {
  const [message, setMessage] = useAtom(messageAtom);
  const [isopen, setisopen] = useState(false);
  const { activeConversation, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user.user);
  const { token } = user;
  const dispatch = useDispatch();
  const textRef = useRef();

  const values = {
    message,
    convo_id: activeConversation?._id,
    files: [],
    token,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(sendMessage(values));
    setMessage("");
  };

  const handleEmojiClick = (emojiObject, event) => {
    const { emoji } = emojiObject;

    setMessage((prevMessage) => prevMessage + emoji);

    const newCursorPosition = textRef.current.value.length + emoji.length;
    textRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
  };

  return (
    <div>
      <div className="absolute bottom-0 h-16 flex justify-between items-center px-4 bg-dark_bg_4 w-full gap-x-5">
        <div className="hover:bg-dark_hover_1/50 duration-200 p-2.5 rounded-full commumnity cursor-pointer">
          <AttachmentIcon className="fill-dark_svg_1/50 cursor-pointer" />
        </div>
        <div className="flex-grow flex items-center rounded-lg gap-x-3 p-3 bg-dark_border_2/80 h-10 relative">
          <div onClick={() => setisopen(!isopen)} className="cursor-pointer">
            <EmojiIcon className="fill-dark_svg_1/50" />
          </div>
          <EmojiPickerApp
            isopen={isopen}
            textRef={textRef}
            onEmojiClick={handleEmojiClick}
          />
          <MessageInput
            handleSubmit={handleSubmit}
            textRef={textRef}
            className="flex-grow focus:outline-none"
          />
        </div>
        <div>
          {message.length === 0 ? (
            <TiMicrophone className="fill-dark_svg_1/50 cursor-pointer text-[26px]" />
          ) : (
            <div onClick={(e) => handleSubmit(e)}>
              {status === "loading" ? (
                <ClipLoader color="#3B82F6" size={24} />
              ) : (
                <SendIcon className="fill-dark_svg_1/50 cursor-pointer" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
