import AllUsers from "./AllUsers";

const SearchResults = ({ searchLength, searchResults }) => {
  return (
    <div>
      <div className="w-full converSATIONS scrollbar">
        <div className="flex flex-col px-8 pt-8">
          <h1 className="font-light text-md text-blue_1 ">All Users</h1>
          <span className="w-full mt-4 ml-6 border-b border-b-dark_border_1"></span>
        </div>

        <ul>
          {searchLength > 0 &&
            searchResults.map((convo) => (
              <AllUsers key={convo._id} convo={convo} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;
