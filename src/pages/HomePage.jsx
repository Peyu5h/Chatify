import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../rtk/chatSlice";
import ChatHome from "../components/ChatScreen/ChatHome";

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.user);
  const { activeConversation } = useSelector((state) => state.chat);
  console.log(activeConversation);
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
        <div className=" col-span-7 sm:col-span-3 lg:col-span-2">
          <Sidebar />
        </div>
        <div className="hidden sm:block col-span-4 lg:col-span-5 h-screen bg-dark_bg_3">
          {activeConversation._id ? "home" : <ChatHome />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
