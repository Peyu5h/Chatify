import { useDispatch, useSelector } from "react-redux";
import { dateHandler } from "../../utils/date";
import { openCreateConversation } from "../../rtk/chatSlice";
import SocketContext from "../../context/SocketContext";
import { useAtom } from "jotai";
import { typingUsersAtom } from "../../atom/atom";

const Convo = ({ convo, socket, online }) => {
  // console.log(check);
  const dispatch = useDispatch();

  const getConversationId = (user, users) => {
    return users[0]._id === user._id ? users[1]._id : users[0]._id;
  };
  const getConversationName = (user, users) => {
    return users[0]._id === user._id ? users[1].name : users[0].name;
  };
  const getConversationPicture = (user, users) => {
    return users[0]._id === user._id ? users[1].picture : users[0].picture;
  };

  const { user } = useSelector((state) => state.user.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const token = user.token;

  const values = {
    token,
    receiver_id: getConversationId(user, convo.users),
  };

  const openConversation = async () => {
    const newConvo = await dispatch(openCreateConversation(values));
    socket.emit("join_conversation", newConvo.payload._id); //{activeConversation._id}
  };
  const [typing, setTyping] = useAtom(typingUsersAtom);

  return (
    <div onClick={() => openConversation()}>
      <div
        className={`h-[72px] bg-dark_bg_1 transition-all hover:bg-dark_bg_2 w-full cursor-pointer px-[10px] border-b-dark_border_1/80 border-b-[0.1px] ${
          convo._id === activeConversation._id ? "bg-dark_bg_2" : ""
        }`}
      >
        <div className="relative w-full flex items-center justify-between py-[10px]">
          {/* left */}
          <div className="flex relative items-center gap-x-3 ">
            <div className="">
              <div
                className={`${
                  online ? "border-2 border-emerald-400" : ""
                } h-[50px] w-[50px] rounded-full overflow-hidden`}
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={getConversationPicture(user, convo.users)}
                    alt={convo.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Name & message */}
            <div className="w-full flex flex-col ">
              <h1 className="font-medium flex items-center gap-x-2 text-sm ">
                {getConversationName(user, convo.users)}
              </h1>
              <div>
                <div className="flex items-center gap-x-1 text-dark_text_2">
                  <span className="text-xs">
                    {convo._id === activeConversation._id
                      ? typing
                        ? "typing..."
                        : convo.latestMessage?.message.length > 24
                        ? convo.latestMessage?.message.substring(0, 24) + "..."
                        : convo.latestMessage?.message
                      : convo.latestMessage?.message.length > 24
                      ? convo.latestMessage?.message.substring(0, 24) + "..."
                      : convo.latestMessage?.message}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="flex flex-col text-xs gap-y-4 items-end  ">
            <span className="text-dark_text_2">
              {convo.latestMessage?.createdAt
                ? dateHandler(convo.latestMessage?.createdAt)
                : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConvoWithSocket = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <Convo {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
};

export default ConvoWithSocket;
