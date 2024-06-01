import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Messages from "./Messages";

const ChatMessages = () => {
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user.user);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [displayedMessages, setDisplayedMessages] = useState([]);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [displayedMessages, imageLoaded]);

  useEffect(() => {
    setDisplayedMessages(messages);
  }, [messages]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setImageLoaded(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }, 500);
    return () => clearTimeout(timeout);
  }, [imageLoaded]);

  return (
    <div>
      <div className="scrollbar overflow-scroll md:h-[87vh] h-[85vh] py-2 px-[6%]">
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
