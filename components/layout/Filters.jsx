"use client";

import React, { useState } from "react";
import { getPriceQueryParams } from "@/helpers/helpers";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

const DynamicStarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false,
});

const Filters = () => {
  const [min, setMin] = useState("")
  const [max, setMax] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const router = useRouter()

  let queryParams;

  const handleClick = (checkbox) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);
    }

    const checkboxes = document.getElementsByName(checkbox.name)

    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false
    })

    if (checkbox.checked === false) {
      // Delete the filter from query
      queryParams.delete(checkbox.name);
    } else {
      // Add or update the filter in query
      if (queryParams.has(checkbox.name)) {
        queryParams.set(checkbox.name, checkbox.value)
      } else {
        queryParams.append(checkbox.name, checkbox.value)
      }
    }
    const path = window.location.pathname + "?" + queryParams.toString()
    router.push(path)
  }

  function checkHandler(checkBoxType, checkBoxValue) {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      const value = queryParams.get(checkBoxType)
      if (checkBoxValue === value) return true
      return false
    }
  }

  const handleButtonClick = () => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search)
      queryParams = getPriceQueryParams(queryParams, "min", min)
      queryParams = getPriceQueryParams(queryParams, "max", max)

      const path = window.location.pathname + "?" + queryParams.toString()
      router.push(path)
    }
  }


  return (
    <>
      <button
        className="md:hidden mb-5 w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
        onClick={handleSidebarToggle}
      >
        Filter by
      </button>
      <aside className={`absolute md:relative left-[-15px] md:left-0 z-10 md:z-0 w-3/4 md:w-1/3 lg:w-1/4 px-4 ${sidebarOpen ? 'translate-x-0 transition-transform ease-in-out duration-300' : '-translate-x-full md:translate-x-[5%] transition-transform ease-in-out duration-300'}`}>
        {/* price range */}
        <div className="px-3 py-2 border border-gray-200 bg-white rounded shadow-sm">
          <h3 className="font-semibold mb-2 flex items-center justify-between">
            Price ($)
            <span
            className="cursor-pointer md:hidden inline-block"
             onClick={handleSidebarToggle}>X</span>
          </h3>
          <div className="grid grid-cols-3 gap-x-2">
            {/* Min */}
            <input
              name="min"
              className="appearance-none text-xs border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Min"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />

            {/* Max */}
            <input
              name="max"
              className="appearance-none text-xs border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
              type="number"
              placeholder="Max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />

            {/* Button Go */}
            <div className=" flex items-center">
              <button className="px-3 py-2 text-center text-xs inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                onClick={handleButtonClick}
              >
                Go
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-3 py-2 border border-gray-200 bg-white rounded shadow-lg">
          <h3 className="font-semibold mb-1">Category</h3>

          <ul className="space-y-1">
            <li>
              <label className="flex items-center text-xs">
                <input
                  name="category"
                  type="checkbox"
                  value="Electronics"
                  className="h-4 w-4"
                  defaultChecked={checkHandler("category", "Electronics")}
                  onClick={(e) => handleClick(e.target)}
                />
                <span className="ml-2 text-gray-500"> Electronics </span>
              </label>
            </li>
            <li>
              <label className="flex items-center text-xs">
                <input
                  name="category"
                  type="checkbox"
                  value="Laptops"
                  className="h-4 w-4"
                  defaultChecked={checkHandler("category", "Laptops")}
                  onClick={(e) => handleClick(e.target)}
                />
                <span className="ml-2 text-gray-500"> Laptops </span>
              </label>
            </li>
            <li>
              <label className="flex items-center text-xs">
                <input
                  name="category"
                  type="checkbox"
                  value="Toys"
                  className="h-4 w-4"
                  defaultChecked={checkHandler("category", "Toys")}
                  onClick={(e) => handleClick(e.target)}
                />
                <span className="ml-2 text-gray-500"> Toys </span>
              </label>
            </li>
            <li>
              <label className="flex items-center text-xs">
                <input
                  name="category"
                  type="checkbox"
                  value="Office Decors"
                  className="h-4 w-4"
                  defaultChecked={checkHandler("category", "Office")}
                  onClick={(e) => handleClick(e.target)}
                />
                <span className="ml-2 text-gray-500"> Office Decors </span>
              </label>
            </li>
            <li>
              <label className="flex items-center text-xs">
                <input
                  name="category"
                  type="checkbox"
                  value="Skin care & Beauty"
                  className="h-4 w-4"
                  defaultChecked={checkHandler("category", "Beauty")}
                  onClick={(e) => handleClick(e.target)}
                />
                <span className="ml-2 text-gray-500"> Skin care & Beauty </span>
              </label>
            </li>
            <li>
              <label className="flex items-center text-xs">
                <input
                  name="category"
                  type="checkbox"
                  value="Women's Fashion"
                  className="h-4 w-4"
                  defaultChecked={checkHandler("category", "Women's Fashion")}
                  onClick={(e) => handleClick(e.target)}
                />
                <span className="ml-2 text-gray-500"> Women's Fashion </span>
              </label>
            </li>
            <li>
              <label className="flex items-center text-xs">
                <input
                  name="category"
                  type="checkbox"
                  value="Men's Fashion"
                  className="h-4 w-4"
                  defaultChecked={checkHandler("category", "Men's Fashion")}
                  onClick={(e) => handleClick(e.target)}
                />
                <span className="ml-2 text-gray-500"> Men's Fashion </span>
              </label>
            </li>
            <li>
              <label className="flex items-center text-xs">
                <input
                  name="category"
                  type="checkbox"
                  value="Watch"
                  className="h-4 w-4"
                  defaultChecked={checkHandler("category", "Watch")}
                  onClick={(e) => handleClick(e.target)}
                />
                <span className="ml-2 text-gray-500"> Watch </span>
              </label>
            </li>
            <li>
              <label className="flex items-center text-xs">
                <input
                  name="category"
                  type="checkbox"
                  value="Smart watch"
                  className="h-4 w-4"
                  defaultChecked={checkHandler("category", "Smart watch")}
                  onClick={(e) => handleClick(e.target)}
                />
                <span className="ml-2 text-gray-500"> Smart watch </span>
              </label>
            </li>
          </ul>

          <hr className="mt-4 mb-2" />

          <h3 className="font-semibold">Ratings</h3>
          <ul className="space-y-1">
            <li>
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center">
                  <input
                    name="ratings"
                    type="checkbox"
                    value={rating}
                    className="h-4 w-4"
                    defaultChecked={checkHandler("ratings", `${rating}`)}
                    onClick={(e) => handleClick(e.target)}
                  />
                  <span className="ml-2 text-gray-500">
                    {" "}
                    <DynamicStarRatings
                      rating={rating}
                      starRatedColor="#ffb829"
                      numberOfStars={5}
                      starDimension="15px"
                      starSpacing="2px"
                      name="rating"
                    />{" "}
                  </span>
                </label>
              ))}
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Filters;