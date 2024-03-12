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

const ChatInput = () => {
  const [message, setMessage] = useAtom(messageAtom);
  const { activeConversation, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user.user);
  const { token } = user;
  const dispatch = useDispatch();
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

  return (
    <div>
      <div className="absolute bottom-0 h-16 flex justify-between items-center px-4 bg-dark_bg_4 w-full gap-x-5">
        <div className="hover:bg-dark_hover_1/50 duration-200 p-2.5 rounded-full commumnity cursor-pointer">
          <AttachmentIcon className="fill-dark_svg_1/50 cursor-pointer" />
        </div>
        <div className="flex-grow flex items-center rounded-lg gap-x-3 p-3 bg-dark_border_2/80 h-10">
          <div className="cursor-pointer">
            <EmojiIcon className="fill-dark_svg_1/50 " />
          </div>
          <MessageInput
            handleSubmit={handleSubmit}
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
