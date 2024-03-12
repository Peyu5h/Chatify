import { useSelector } from "react-redux";
import Messages from "./Messages";
import { useEffect, useRef } from "react";

const ChatMessages = () => {
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user.user);
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <div className="scrollbar overflow-scroll h-[87vh] py-2 px-[6%]">
        {messages.map((message) => (
          <Messages
            messages={message}
            key={message._id}
            me={user._id === message.sender._id}
          />
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
