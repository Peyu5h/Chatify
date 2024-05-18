import { useState } from "react";
import Header from "./Header";
import Search from "./Search";
import Conversations from "./Conversations";
import SearchResults from "./SearchResults";
import { useAtom } from "jotai";
import { searchAtom } from "../../atom/atom";

const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useAtom(searchAtom);

  return (
    <div>
      <div className="w-full">
        <div className="header w-full">
          <Header />
          <Search
            setSearchResults={setSearchResults}
            searchResults={searchResults}
            searchLength={searchResults.length}
          />
          {searchResults.length > 0 ? (
            <SearchResults
              searchLength={searchResults.length}
              searchResults={searchResults}
            />
          ) : search.length > 1 ? (
            <div className="   text-blue_1 text-center mt-4">No user found</div>
          ) : (
            <Conversations />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
