import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, showSearch, setSearch, setShowSearch, navigate, products } =
    useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Search is now available globally
    if (showSearch) {
        setVisible(true);
    } else {
        setVisible(false);
    }
  }, [showSearch]);

  useEffect(() => {
    if (search.length > 0) {
      const filtered = products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 5); // Limit to top 5
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [search, products]);

  const handleSuggestionClick = (name) => {
    setSearch(name);
    setSuggestions([]);
  };

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center relative z-50">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white">
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className="w-4" src={assets.search_icon} alt="search_icon" />
      </div>
      <img
        className="inline w-3 cursor-pointer"
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        alt="cross_icon"
      />
      {/* Autocomplete Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-[-10px] w-3/4 sm:w-1/2 bg-white border border-gray-200 shadow-lg rounded-b-lg overflow-hidden text-left">
          {suggestions.map((item) => (
            <div
              key={item._id}
              onClick={() => handleSuggestionClick(item.name)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 font-light flex items-center justify-between"
            >
              <span>{item.name}</span>
              <span className="text-gray-400 text-xs">select</span>
            </div>
          ))}
        </div>
      )}
    </div>
  ) : null;
};

export default SearchBar;
