import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Messages from "./Messages";

const ChatMessages = () => {
  const { messages, status } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user.user);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [displayedMessages, setDisplayedMessages] = useState([]);

  const endRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [displayedMessages]);

  useEffect(() => {
    // Update displayed messages when messages change
    setDisplayedMessages(messages);
  }, [messages]);

  useEffect(() => {
    // Delay setting imageLoaded to false
    const timeout = setTimeout(() => {
      setImageLoaded(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      <div className="scrollbar overflow-scroll h-[87vh] py-2 px-[6%]">
        {displayedMessages.map((message) => (
          <Messages
            messages={message}
            key={message._id}
            me={user._id === message.sender._id}
            imageLoaded={imageLoaded}
          />
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
