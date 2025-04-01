import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };

  return (
    <div className="">
      <form className="relative" onSubmit={handleSubmit}>
        <div className="flex">
          <div className="relative w-96">
            <input
              type="text"
              className="text-sm tracking-wide rounded-lg border border-surface-300 w-full ps-5 px-2 py-2 bg-surface-200 placeholder-gray-200 text-white focus:ring-surface-300 focus:border-surface-300 "
              placeholder="Enter search query here"
              value={searchQuery}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="absolute top-0 end-0 px-4 h-full text-white rounded-e-lg items-center bg-primary-500 hover:bg-primary-400"
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;