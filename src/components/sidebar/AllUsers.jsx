const Allusers = ({ user }) => {
  return (
    <li>
      <div className="list-none h-[72px] bg-dark_bg_1 hover:bg-dark_bg_2 w-full cursor-pointer px-[10px]">
        <div className="relative w-full flex items-center justify-between py-[10px]">
          {/* left */}
          <div className="flex items-center gap-x-3 ">
            <div className="">
              <div className=" h-[50px] w-[50px] rounded-full overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={user?.picture}
                    alt={user?.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col ">
              <h1 className="font-medium flex items-center gap-x-2 text-sm ">
                {user?.name}
              </h1>
              <div>
                <div className="flex items-center gap-x-1 text-dark_text_2">
                  <span className="text-xs">{user?.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Allusers;
