"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const api = process.env.api_path

const Search = () => {
  const [keyword, setKeyword] = useState("")
  const [searchResults, setSearchResults] = useState([]);

  const router = useRouter()

  const fetchSearchResults = async (searchKeyword) => {
    try {
      const { data } = await axios.get(`${api}/api/products?keyword=${searchKeyword}`);
      if (data) {
        setSearchResults(data.products || []);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      fetchSearchResults(keyword);
      router.push(`/?keyword=${keyword}`);
    } else {
      setSearchResults([]);
      router.push("/");
    }
  };

  const handleSearch = (e) => {
    const searchKeyword = e.target.value;
    setKeyword(searchKeyword);
    fetchSearchResults(searchKeyword);
    if (!searchKeyword) {
      setSearchResults([])
    }
  };

  return (
    <>
      <form className="relative flex md:justify-start justify-center flex-nowrap items-center w-full order-last md:order-none md:mt-0 md:w-2/4 lg:w-2/4" onSubmit={submitHandler}>
        <div className="border border-1 border-gray-200 md:w-auto w-full flex items-center py-2 px-3 rounded-lg md:mx-0 mx-3 md:mb-0 mb-[16px]">
          <input
            className="flex-grow text-gray-300 outline-none border-none bg-transparent appearance-none hover:border-gray-400 focus:outline-none focus:border-gray-400"
            type="text"
            value={keyword}
            onChange={handleSearch}
            placeholder="Search for products"
            required
          />
          <i onClick={submitHandler} className="absolute right-[1.4rem] md:right-[-3.3rem] text-gray-100 fa-solid fa-magnifying-glass bg-gray-500 py-2 px-4 rounded-lg"></i>
        </div>
      </form>
      {searchResults.length > 0 && (
        <div className="bg-white w-[21rem] rounded-md text-black px-3 py-2 absolute top-28 md:top-[4.25rem] left-[0.8rem] md:left-[18.3rem] z-50 shadow-md">
          <ul>
            {searchResults.map((product) => (
              <li
                className="cursor-pointer my-2 text-sm"
                key={product._id}
                onClick={submitHandler}
              >
                {product.name.substring(0, 39)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Search;
