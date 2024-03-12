import { useAtom } from "jotai";
import React from "react";
import { messageAtom } from "../../../atom/atom";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../rtk/chatSlice";

const MessageInput = ({ handleSubmit, textRef }) => {
  const [message, setMessage] = useAtom(messageAtom);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          onChange={(e) => setMessage(e.target.value)}
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

export default MessageInput;
