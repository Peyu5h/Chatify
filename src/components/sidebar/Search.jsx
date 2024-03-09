import { useState } from "react";

import ReturnIcon from "../../svg/Return";
import SearchIcon from "../../svg/Search";
import FilterIcon from "../../svg/FilterIcon";
const Search = ({ searchLength }) => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <div>
      <div className="h-[50px]  py-1.5">
        <div className="px-[10px]">
          <div className="flex items-center gap-x-2">
            <div className="w-full flex bg-dark_bg_2 rounded-lg pl-2">
              {show || searchLength > 0 ? (
                <span className="w-8 flex items-center justify-center rotateAnimation">
                  <ReturnIcon className="fill-blue_1 w-5 " />
                </span>
              ) : (
                <span className="w-8 flex items-center justify-center roatateAnimation">
                  <SearchIcon className="fill-dark_svg_2 w-5 " />
                </span>
              )}
              <input
                type="text"
                placeholder="Search"
                className="input"
                onFocus={() => setShow(true)}
                onBlur={() => search.length == 0 && setShow(false)}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="filter">
              <button>
                <FilterIcon className="fill-dark_svg_2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
