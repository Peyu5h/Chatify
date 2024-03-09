import { useEffect, useState } from "react";

import ReturnIcon from "../../svg/Return";
import SearchIcon from "../../svg/Search";
import FilterIcon from "../../svg/FilterIcon";
import { useSelector } from "react-redux";
import { useAtom } from "jotai";
import { searchAtom } from "../../atom/atom";

const Search = ({ searchResults, setSearchResults, searchLength }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { user } = useSelector((state) => state.user.user);
  const token = user.token;
  const [show, setShow] = useState(false);
  const [search, setSearch] = useAtom(searchAtom);

  const changeSearch = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);

    if (inputValue.trim() === "") {
      setShow(false);
      setSearchResults([]);
    } else {
      setShow(true);
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`${backendUrl}/user?search=${search}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handleReset = () => {
    setSearch("");
    setShow(false);
    setSearchResults([]);
  };

  return (
    <div>
      <div className="h-[50px]  py-1.5">
        <div className="px-[10px]">
          <div className="flex items-center gap-x-2">
            <div className="w-full flex bg-dark_bg_2 rounded-lg pl-2">
              {show || searchLength > 0 ? (
                <span
                  onClick={handleReset}
                  className="w-8 flex items-center cursor-pointer justify-center rotateAnimation"
                >
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
                value={search}
                onFocus={() => setShow(true)}
                onBlur={() => searchLength == 0 && setShow(false)}
                onChange={(e) => changeSearch(e)}
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
