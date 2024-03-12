import moment from "moment";
import SeenIcon from "../../../svg/Seen";

const Messages = ({ messages, me }) => {
  return (
    <div>
      <div
        className={`w-full flex mt-2 space-x-3 max-w-[416px] ${
          me ? "ml-auto justify-end" : ""
        }`}
      >
        <div>
          <div
            className={`relative text-[14px] h-full text-dark_text_1 p-2.5 rounded-b-lg   ${
              me ? "bg-blue_3 rounded-l-lg" : "bg-dark_bg_4 rounded-r-lg"
            }`}
          >
            <div
              className={` h-4 w-3 absolute top-[0px] ${
                me
                  ? " triangle-right bg-blue_3  right-[-11px]"
                  : "triangle-left bg-dark_bg_4 left-[-11px]"
              } `}
            ></div>
            {/* messsages */}
            <p
              className={` ${
                messages.message.length > 60 ? "mr-0 mb-1" : "mr-[4.5rem]"
              }`}
            >
              {messages.message}
            </p>
            {/* date */}

            <p className="absolute flex gap-x-1 text-[11px] right-1 bottom-[-4px] m-1 text-dark_text_5">
              {moment(messages.createdAt).format("h:mm A")}
              {me && <SeenIcon className="fill-dark_text_5 " />}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
