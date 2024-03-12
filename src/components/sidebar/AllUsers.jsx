import { useDispatch, useSelector } from "react-redux";
import { openCreateConversation } from "../../rtk/chatSlice";
import SocketContext from "../../context/SocketContext";

const Allusers = ({ convo, socket }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user.user);
  const token = user.token;

  const values = {
    token,
    receiver_id: convo._id,
  };

  const openConversation = async () => {
    const newConvo = await dispatch(openCreateConversation(values));
    socket.emit("join_conversation", newConvo.payload._id); //{activeConversation._id}
  };
  return (
    <li onClick={() => openConversation()}>
      <div className="list-none h-[72px] bg-dark_bg_1 hover:bg-dark_bg_2 w-full cursor-pointer px-[10px]">
        <div className="relative w-full flex items-center justify-between py-[10px]">
          {/* left */}
          <div className="flex items-center gap-x-3 ">
            <div className="">
              <div className=" h-[50px] w-[50px] rounded-full overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={convo?.picture}
                    alt={convo?.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col ">
              <h1 className="font-medium flex items-center gap-x-2 text-sm ">
                {convo?.name}
              </h1>
              <div>
                <div className="flex items-center gap-x-1 text-dark_text_2">
                  <span className="text-xs">{convo?.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

const AllusersWithSocket = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <Allusers {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
};

export default AllusersWithSocket;
