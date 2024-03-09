import { useSelector } from "react-redux";
import Convo from "./Convo";

const Conversations = () => {
  const conversation = useSelector((state) => state.chat.conversation);
  return (
    <div>
      <div className=" converSATIONS scrollbar text-white">
        {conversation &&
          conversation.map((convo) => <Convo key={convo._id} convo={convo} />)}
      </div>
    </div>
  );
};

export default Conversations;
