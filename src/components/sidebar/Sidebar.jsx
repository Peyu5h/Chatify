import React, { useState } from "react";
import Header from "./Header";
import Notifications from "./search/Search";
import Search from "./search/Search";

const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div>
      <div className="">
        <div className="header">
          <Header />
          <Search searchLength={searchResults.length} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
