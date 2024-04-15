import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations, updateMessages } from "../rtk/chatSlice";
import ChatHome from "../components/ChatScreen/ChatHome";
import ChatPage from "../components/ChatScreen/ChatPage";
import SocketContext from "../context/SocketContext";
import { useAtom } from "jotai";
import {
  onlineUsersAtom,
  showProfileInfoAtom,
  showUserInfoAtom,
  typingUsersAtom,
} from "../atom/atom";
import ContactInfo from "../components/ContactInfo/ContactInfo";
import Profile from "../components/Profile/Profile";

const HomePage = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useAtom(onlineUsersAtom);
  const [isTyping, setIsTyping] = useAtom(typingUsersAtom);
  const [showUserInfo, setShowUserInfo] = useAtom(showUserInfoAtom);
  const [showProfileInfo, setShowProfileInfo] = useAtom(showProfileInfoAtom);

  useEffect(() => {
    const userId = user?._id;
    socket.emit("join", userId);
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  //listen for received messages
  useEffect(() => {
    socket.on("receive_message", (message) => {
      dispatch(updateMessages(message));
    });

    socket.on("typing", () => {
      console.log("Received typing event");
      setIsTyping(true);
    });

    socket.on("stopTyping", () => {
      console.log("Received stopTyping event");
      setIsTyping(false);
    });

    return () => {
      // Clean up event listeners when the component unmounts
      socket.off("receive_message");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      if (user?.token) {
        await dispatch(getConversations(user.token));
      }
    };

    fetchConversations();
  }, [dispatch, user?.token]);

  return (
    <div>
      <div className="h-screen bg-dark_bg_1 text-dark_text_1  grid grid-rows-1 grid-cols-7">
        {showProfileInfo && (
          <div className=" slide-in-from-left col-span-7 sm:col-span-3 lg:col-span-2">
            <div className="">
              <Profile />
            </div>
          </div>
        )}
        <div
          className={`${
            showProfileInfo ? "hidden col-span-0" : ""
          } col-span-7 sm:col-span-3 lg:col-span-2`}
        >
          <Sidebar />
        </div>
        <div
          className={`hidden sm:block col-span-4 ${
            showUserInfo ? "lg:col-span-3" : "lg:col-span-5"
          } h-screen bg-dark_bg_3`}
        >
          {activeConversation._id ? <ChatPage /> : <ChatHome />}
        </div>
        {showUserInfo && (
          <div className=" slide-in-from-right col-span-7 sm:col-span-3 lg:col-span-2">
            <div className="">
              <ContactInfo />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const HomePageWithSocket = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <HomePage {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
};

export default HomePageWithSocket;
