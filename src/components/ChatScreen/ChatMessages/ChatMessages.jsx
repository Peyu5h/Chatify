import React from "react";
import { useSelector } from "react-redux";
import Messages from "./Messages";

const ChatMessages = () => {
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user.user);
  return (
    <div>
      <div className="scrollbar overflow-scroll h-[88vh] py-2 px-[6%]">
        {messages.map((message) => (
          <Messages
            messages={message}
            key={message._id}
            me={user._id === message.sender._id}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
