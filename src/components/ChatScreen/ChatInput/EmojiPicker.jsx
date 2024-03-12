// EmojiPickerApp.jsx
import EmojiPicker from "emoji-picker-react";
import React from "react";

const EmojiPickerApp = ({ isopen, textRef, onEmojiClick }) => {
  return (
    <div
      className={`openAnimation absolute bottom-16 left-0 ${
        isopen ? "block" : "hidden"
      }`}
    >
      <EmojiPicker onEmojiClick={onEmojiClick} theme="dark" />
    </div>
  );
};

export default EmojiPickerApp;
