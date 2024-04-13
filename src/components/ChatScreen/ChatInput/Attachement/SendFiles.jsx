import React, { useState } from "react";
import { MdSend } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearFiles, sendMessage } from "../../../../rtk/chatSlice";
import SocketContext from "../../../../context/SocketContext";
import { ClipLoader, MoonLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendFiles = ({ files, message, socket }) => {
  const CLOUDINARY_SEC = import.meta.env.VITE_CLOUDINARY_SEC;
  const CLOUDINARY_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { files: flies, activeConversation } = useSelector(
    (state) => state.chat
  );
  const { user } = useSelector((state) => state.user);
  const { token } = user.user;
  console.log(flies, token);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const uploaded_files = await uploadFiles(files);
    console.log(uploaded_files);

    const values = {
      token,
      message,
      convo_id: activeConversation._id,
      files: uploaded_files.length > 0 ? uploaded_files : [],
    };

    let newMessage = await dispatch(sendMessage(values));
    socket.emit("send_message", newMessage.payload);
    setLoading(false);
    dispatch(clearFiles());
  };

  const uploadFiles = async (files) => {
    const uploaded = [];
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        const file = files[i].files;
        const type = files[i].type;
        const size = file.size;
        if (size === 0) {
          notify("File is Empty", "error");
          setLoading(false);
          return;
        }
        formData.append("upload_preset", CLOUDINARY_SEC);
        formData.append("file", file);
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/raw/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        uploaded.push({ file: data, type: type });
      }
      return uploaded;
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const notify = (message, type) => {
    toast(message, {
      type: type,
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div>
      <button
        onClick={(e) => handleUpload(e)}
        className="bg-blue_1 hover:bg-blue_3 duration-200 p-4 rounded-full text-white"
      >
        {loading ? (
          <div className="h-6 w-6">
            <ClipLoader color="white" size={22} />
          </div>
        ) : (
          <MdSend className="h-6 w-6" />
        )}
      </button>
      <ToastContainer />
    </div>
  );
};

const SendFilesWithSocket = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <SendFiles {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
};

export default SendFilesWithSocket;
