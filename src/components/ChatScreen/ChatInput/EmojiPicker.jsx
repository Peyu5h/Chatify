// EmojiPickerApp.jsx
import EmojiPicker from "emoji-picker-react";
import React, { useRef } from "react";
import ClickOutside from "../../../utils/ClickOutside";

const EmojiPickerApp = ({ isopen, setisopen, textRef, onEmojiClick }) => {
  const el = useRef(null);
  ClickOutside(el, () => {
    setisopen(false);
  });
  return (
    <div
      ref={el}
      className={`openAnimation absolute bottom-16 left-0 ${
        isopen ? "block" : "hidden"
      }`}
    >
      <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
    </div>
  );
};

export default EmojiPickerApp;
