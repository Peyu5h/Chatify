import { useDispatch, useSelector } from "react-redux";
import ChatPageHeader from "./Header/ChatPageHeader";
import ChatMessages from "./ChatMessages/ChatMessages";
import { useEffect } from "react";
import { getConvoMessages } from "../../rtk/chatSlice";
import ChatInput from "./ChatInput/ChatInput";
import PreviewScreen from "./ChatInput/Attachement/PreviewScreen";

const ChatPage = ({ callUser, remotePeerId }) => {
  const { user } = useSelector((state) => state.user.user);
  const token = user.token;
  const { activeConversation, files } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const values = {
    token,
    convo_id: activeConversation?._id,
  };

  useEffect(() => {
    if (activeConversation?._id) {
      dispatch(getConvoMessages(values));
    }
  }, [activeConversation]);

  return (
    <div className="relative h-screen bg-cover w-full">
      {/* Background Image */}
      <div className="absolute inset-0 bg-chetPattern opacity-[0.07] bg-fill"></div>
      {/* <div className="absolute inset-0 bg-ChatPattern opacity-20 bg-cover"></div> */}

      <div className="relative h-screen z-10">
        <ChatPageHeader callUser={callUser} remotePeerId={remotePeerId} />
        {files.length > 0 ? (
          <PreviewScreen />
        ) : (
          <>
            <ChatMessages />
            <ChatInput />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
