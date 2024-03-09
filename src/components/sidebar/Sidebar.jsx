import React, { useState } from "react";
import Header from "./Header";
import Notifications from "./Search";
import Search from "./Search";
import Conversations from "./Conversations";

const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div>
      <div className="">
        <div className="header">
          <Header />
          <Search searchLength={searchResults.length} />
          <Conversations />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
