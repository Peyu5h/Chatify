import { useEffect } from "react";
import ChatScreen from "../components/ChatScreen/ChatScreen";
import Sidebar from "../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../rtk/chatSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user.token));
    }
  }, []);
  return (
    <div>
      <div className="h-screen bg-dark_bg_1 text-dark_text_1  grid grid-rows-1 grid-cols-7">
        <div className="col-span-3 lg:col-span-2">
          <Sidebar />
        </div>
        <div className="hidden sm:block col-span-4 lg:col-span-5 h-screen bg-dark_bg_3">
          <ChatScreen />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
