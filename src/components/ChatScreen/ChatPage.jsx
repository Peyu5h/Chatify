import { useDispatch, useSelector } from "react-redux";
import ChatPageHeader from "./Header/ChatPageHeader";
import ChatMessages from "./ChatMessages/ChatMessages";
import { useEffect } from "react";
import { getConvoMessages } from "../../rtk/chatSlice";

const ChatPage = () => {
  const { user } = useSelector((state) => state.user.user);
  const token = user.token;
  const { activeConversation, messages } = useSelector((state) => state.chat);
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

  console.log(messages);

  return (
    <div className="relative h-screen bg-cover">
      {/* Background Image */}
      <div className="absolute inset-0 bg-chetPattern opacity-[0.07] bg-fill"></div>
      {/* <div className="absolute inset-0 bg-ChatPattern opacity-20 bg-cover"></div> */}

      <div className="relative z-10">
        <ChatPageHeader />
        <ChatMessages />
      </div>
    </div>
  );
};

export default ChatPage;
