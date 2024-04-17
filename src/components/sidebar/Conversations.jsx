import { useSelector } from "react-redux";
import Convo from "./Convo";
import { useAtom } from "jotai";
import { onlineUsersAtom } from "../../atom/atom";

const Conversations = () => {
  const { conversation, activeConversation } = useSelector(
    (state) => state.chat
  );
  const getConversationId = (user, users) => {
    return users[0]._id === user._id ? users[1]._id : users[0]._id;
  };

  const [onlineUsers, setOnlineUsers] = useAtom(onlineUsersAtom);
  const { user } = useSelector((state) => state.user.user);
  return (
    <div>
      <div className=" converSATIONS scrollbar text-white">
        {conversation &&
          conversation

            .filter(
              (convo) =>
                convo.latestMessage || convo._id === activeConversation._id
            )
            .map((convo) => {
              let check = onlineUsers.find(
                (u) => u.userId === getConversationId(user, convo.users)
              );
              return (
                <Convo
                  key={convo._id}
                  convo={convo}
                  online={check ? true : false}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Conversations;
