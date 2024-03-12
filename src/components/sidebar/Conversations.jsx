import { useSelector } from "react-redux";
import Convo from "./Convo";

const Conversations = () => {
  const { conversation, activeConversation } = useSelector(
    (state) => state.chat
  );
  return (
    <div>
      <div className=" converSATIONS scrollbar text-white">
        {conversation &&
          conversation
            .filter(
              (convo) =>
                convo.latestMessage || convo._id === activeConversation._id
            )
            .map((convo) => <Convo key={convo._id} convo={convo} />)}
      </div>
    </div>
  );
};

export default Conversations;
