import { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations, updateMessages } from "../rtk/chatSlice";
import ChatHome from "../components/ChatScreen/ChatHome";
import ChatPage from "../components/ChatScreen/ChatPage";
import Call from "../components/Calling/VideoCall/Call";
import SocketContext from "../context/SocketContext";
import { useAtom } from "jotai";
import {
  onlineUsersAtom,
  showProfileInfoAtom,
  showUserInfoAtom,
  showVideoCallAtom,
  typingUsersAtom,
} from "../atom/atom";
import ContactInfo from "../components/ContactInfo/ContactInfo";
import Profile from "../components/Profile/Profile";
import Peer from "peerjs";

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

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // call
  const callData = {
    socketId: "",
    receivingCall: false,
    callEnded: false,
    name: "",
    picture: "",
  };

  const [call, setCall] = useState(callData);
  const { receivingCall, callEnded } = call;
  const [callAccepted, setCallAccepted] = useState(false);
  const [showVideoCall, setShowVideoCall] = useAtom(showVideoCallAtom);

  const [stream, setStream] = useState(null);
  const myVideo = useRef();
  const userVideo = useRef();

  useEffect(() => {
    setupMedia();
    socket.on("setup socket", (id) => {
      setCall({ ...call, socketId: id });
    });

    socket.on("call-user", (data) => {
      setCall({
        ...call,
        receivingCall: true,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        socketId: data.from,
      });
      setShowVideoCall(true);
    });
  }, []);

  const getConversationId = (user, users) => {
    return users[0]._id === user._id ? users[1]._id : users[0]._id;
  };
  const getConversationName = (user, users) => {
    return users[0]._id === user._id ? users[1].name : users[0].name;
  };
  const getConversationPicture = (user, users) => {
    return users[0]._id === user._id ? users[1].picture : users[0].picture;
  };

  const callUser = () => {
    enableMedia();
    setCall({
      ...call,
      name: getConversationName(user, activeConversation.users),
      picture: getConversationPicture(user, activeConversation.users),
    });

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer.on("open", (id) => {
      socket.emit("call-user", {
        userToCall: getConversationId(user, activeConversation.users),
        signal: id,
        from: call.socketId,
        name: user.name,
        picture: user.picture,
      });
    });
  };

  const setupMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current && userVideo.current) {
          myVideo.current.srcObject = stream;
          userVideo.current.srcObject = stream;
        }
      });
  };

  const enableMedia = () => {
    myVideo.current.srcObject = stream;
  };

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
            showProfileInfo
              ? "hidden"
              : "col-span-7 sm:col-span-3 lg:col-span-2"
          }`}
        >
          {windowWidth > 576 ? (
            <Sidebar />
          ) : (
            <div>
              {activeConversation._id ? (
                <div className="flex sm:hidden">
                  {!showUserInfo && <ChatPage callUser={callUser} />}
                </div>
              ) : (
                <Sidebar />
              )}
            </div>
          )}
        </div>

        <div
          className={`hidden sm:block col-span-4 ${
            showUserInfo ? "lg:col-span-3" : "lg:col-span-5"
          } h-screen bg-dark_bg_3`}
        >
          {activeConversation._id ? (
            <ChatPage callUser={callUser} />
          ) : (
            <ChatHome />
          )}
        </div>
        {showUserInfo && (
          <div className=" slide-in-from-right col-span-7 sm:col-span-3 lg:col-span-2">
            <div className="">
              <ContactInfo />
            </div>
          </div>
        )}
      </div>
      {showVideoCall && (
        <Call
          receivingCall={receivingCall}
          call={call}
          setCall={setCall}
          callAccepted={callAccepted}
          myVideo={myVideo}
          userVideo={userVideo}
          stream={stream}
        />
      )}
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
