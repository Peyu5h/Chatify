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
import Ringing from "../components/Calling/VideoCall/Ringing";
import CallHeader from "../components/Calling/VideoCall/CallHeader";
import CallFooter from "../components/Calling/VideoCall/CallFooter";
import { initializePeerThunk, updatePeerIds } from "../rtk/userSlice";

const HomePage = ({ socket }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.user);
  const { peerId } = useSelector((state) => state.user.user);
  const { activeConversation } = useSelector((state) => state.chat);
  const [onlineUsers, setOnlineUsers] = useAtom(onlineUsersAtom);
  const [isTyping, setIsTyping] = useAtom(typingUsersAtom);
  const [showUserInfo, setShowUserInfo] = useAtom(showUserInfoAtom);
  const [showProfileInfo, setShowProfileInfo] = useAtom(showProfileInfoAtom);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const initPeer = async () => {
      try {
        const action = await dispatch(initializePeerThunk());
        if (initializePeerThunk.fulfilled.match(action)) {
          const { peer } = action.payload;
          peerRef.current = peer;

          peer.on("call", (call) => {
            setIncomingCall(call);
          });
        }
      } catch (error) {
        console.error("Failed to initialize peer", error);
      }
    };

    initPeer();

    return () => {
      if (peerRef.current) {
        peerRef.current.destroy();
      }
    };
  }, [dispatch, user]);

  useEffect(() => {
    const userId = user?._id;
    socket.emit("join", userId);

    socket.on("get-online-users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("user-disconnected", (disconnectedUserId) => {
      setOnlineUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== disconnectedUserId)
      );
    });
  }, [user, socket, setOnlineUsers]);

  //listen for received messages
  useEffect(() => {
    socket.on("receive_message", (message) => {
      dispatch(updateMessages(message));
    });

    socket.on("typing", () => {
      // console.log("Received typing event");
      setIsTyping(true);
    });

    socket.on("stopTyping", () => {
      // console.log("Received stopTyping event");
      setIsTyping(false);
    });

    return () => {
      socket.off("receive_message");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [socket, dispatch, setIsTyping]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (user?.token) {
        await dispatch(getConversations(user.token));
      }
    };

    fetchConversations();
  }, [dispatch, user?.token]);

  //CALLLING

  const [myPeerId, setMyPeerId] = useState("");
  useEffect(() => {
    setMyPeerId(peerId);
    const updatePeerId = async () => {
      const response = await fetch(`${backendUrl}/updatePeer/set`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ userId: user._id, peerId }),
      });
      const data = await response.json();
    };
    updatePeerId();
  }, [user, peerId, dispatch]);

  const [remotePeerId, setRemotePeerId] = useState("");
  const [incomingCall, setIncomingCall] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [call, setCall] = useState(null);
  const [micMuted, setMicMuted] = useState(false);
  const [speakerMuted, setSpeakerMuted] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);

  const [showVideoCall, setShowVideoCall] = useAtom(showVideoCallAtom);
  const [isHovered, setIsHovered] = useState(false);

  const CallerUser = activeConversation?.users?.find((u) => u._id == user._id);

  useEffect(() => {
    const receiverUser = activeConversation?.users?.find(
      (u) => u._id !== user._id
    );

    const RemotePeerId = receiverUser?.peerId;
    if (RemotePeerId !== undefined) {
      setRemotePeerId(RemotePeerId);
    }
  }, [activeConversation]);

  const callPeer = async (peerId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setShowVideoCall(true);
      setLocalStream(stream);

      setTimeout(() => {
        localVideoRef.current.srcObject = stream;
      }, 100);

      const call = peerRef.current.call(peerId, stream);
      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
      });
      setCall(call);
    } catch (error) {
      console.error("Error accessing media devices.", error);
    }
  };

  const handlePickUp = async () => {
    if (incomingCall) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setShowVideoCall(true);
        setLocalStream(stream);

        setTimeout(() => {
          localVideoRef.current.srcObject = stream;
        }, 100);

        incomingCall.answer(stream);
        incomingCall.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
        setCall(incomingCall);
        setIncomingCall(null);
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    }
  };

  const handleDecline = () => {
    if (incomingCall) {
      incomingCall.close();
      setIncomingCall(null);
      setShowVideoCall(false);
    }
  };

  const handleMuteMic = () => {
    if (localStream) {
      const enabled = localStream.getAudioTracks()[0].enabled;
      localStream.getAudioTracks()[0].enabled = !enabled;
      setMicMuted(!enabled);
    }
  };

  const handlePauseVideo = () => {
    if (localStream) {
      const enabled = localStream.getVideoTracks()[0].enabled;
      localStream.getVideoTracks()[0].enabled = !enabled;
      setVideoPaused(!enabled);
    }
  };

  const handleLeaveCall = () => {
    if (call) {
      call.close();
      setCall(null);
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        setLocalStream(null);
        localVideoRef.current.srcObject = null;
        remoteVideoRef.current.srcObject = null;
      }
    }
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
                  {!showUserInfo && <ChatPage callUser={callPeer} />}
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
            <ChatPage callUser={callPeer} remotePeerId={remotePeerId} />
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
        <div>
          <div className="relative">
            <div
              style={{ zIndex: 1000 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`z-9 overflow-hidden w-[20rem] h-[32rem]  bg-dark_bg_4 flex flex-col justify-between fixed top-16 rounded-xl left-1/2 -translate-x-1/2 text-dark_text_1`}
            >
              <div
                style={{
                  zIndex: 10,
                }}
                className="p-4"
              >
                <CallHeader name={name} />
              </div>

              {/* video Stream */}
              {/* Remote user's video */}
              <div className="videoStream relative">
                <div
                  className="fixed top-0 left-0 w-full h-full bg-yellow-500 rounded-lg"
                  style={{
                    zIndex: 2,
                  }}
                >
                  <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  ></video>
                </div>
                {/* Local user's video */}
                <div className="">
                  <video
                    ref={localVideoRef}
                    autoPlay
                    muted
                    className={`SmallVideoCall rounded-lg fixed ${
                      isHovered ? "moveVideoCall" : ""
                    }`}
                  ></video>
                </div>
              </div>
              {isHovered && (
                <div style={{ zIndex: 8 }} className="footer duration-200 ">
                  <CallFooter
                    handlePauseVideo={handlePauseVideo}
                    handleMuteMic={handleMuteMic}
                    handleLeaveCall={handleLeaveCall}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ring */}
      {incomingCall && (
        <Ringing
          setIncomingCall={setIncomingCall}
          handlePickUp={handlePickUp}
          handleDecline={handleDecline}
          CallerUser={CallerUser}
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
