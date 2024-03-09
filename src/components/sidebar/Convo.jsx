import { dateHandler } from "../../utils/date";

const Convo = ({ convo }) => {
  return (
    <div>
      <div className="h-[72px] bg-dark_bg_1 hover:bg-dark_bg_2 w-full cursor-pointer px-[10px]">
        <div className="relative w-full flex items-center justify-between py-[10px]">
          {/* left */}
          <div className="flex items-center gap-x-3 ">
            <div className="">
              <div className=" h-[50px] w-[50px] rounded-full overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={convo.picture}
                    alt={convo.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Name & message */}
            <div className="w-full flex flex-col ">
              <h1 className="font-medium flex items-center gap-x-2 text-sm ">
                {convo.name}
              </h1>
              <div>
                <div className="flex items-center gap-x-1 text-dark_text_2">
                  <span className="text-xs">
                    {convo.latestMessage?.message}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="flex flex-col text-xs gap-y-4 items-end  ">
            <span className="text-dark_text_2">
              {dateHandler(convo.latestMessage?.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Convo;
