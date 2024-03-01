import ChatScreen from "../components/ChatScreen/ChatScreen";
import Sidebar from "../components/sidebar/Sidebar";

const HomePage = () => {
  return (
    <div>
      <div className="h-screen bg-dark_bg_1 text-dark_text_1 p-8 grid grid-rows-1 grid-cols-7">
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
