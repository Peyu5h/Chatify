import { useAtom } from "jotai";
import React, { useState } from "react";
import { messageAtom, typingUsersAtom } from "../../../atom/atom";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../rtk/chatSlice";
import SocketContext from "../../../context/SocketContext";

const MessageInput = ({ handleSubmit, textRef, socket }) => {
  const [message, setMessage] = useAtom(messageAtom);

  const [typing, setTyping] = useState(false);

  const { activeConversation } = useSelector((state) => state.chat);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const [typingTimeout, setTypingTimeout] = useState(null);

  const onChangeHandler = (e) => {
    setMessage(e.target.value);
    if (e.target.value.length > 0) {
      if (!typing) {
        setTyping(true);
        socket.emit("typing", activeConversation._id);
      }
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      const newTimeout = setTimeout(() => {
        socket.emit("stopTyping", activeConversation._id);
        setTyping(false);
      }, 2000);

      setTypingTimeout(newTimeout);
    } else {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      socket.emit("stopTyping", activeConversation._id);
      setTyping(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          onChange={onChangeHandler}
          className="w-[55vw] h-9 bg-transparent outline-none placeholder-dark_text_5 font-light placeholder:font-light placeholder:pl-0.5 text-dark_text_1"
          type="text"
          required
          value={message}
          placeholder="Type a message"
          ref={textRef}
        />
      </form>
    </div>
  );
};

const MessageInputWithSocket = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <MessageInput {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
};

export default MessageInputWithSocket;
