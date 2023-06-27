import React from "react";
import CreatorList from "./CreatorList";
const FindCreators = () => {
  return (
    <>
      <div className="flex justify-center mt-10">
        <h1 class="mb-4 text-xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-5xl dark:text-white">
          find creators
        </h1>
      </div>
      <div className="flex justify-center mt-10">
        <form className="w-1/3">
          <label
            for="search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="search"
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              class="text-white absolute right-2.5 bottom-2.5 bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="flex justify-center mt-10">
        <span class="bg-white text-black text-lg font-medium mr-2 px-2.5 py-0.5 rounded-xl ">
          music
        </span>
        <span class="bg-white text-black text-lg font-medium mr-2 px-2.5 py-0.5 rounded-xl ">
          videos
        </span>
        <span class="bg-white text-black text-lg font-medium mr-2 px-2.5 py-0.5 rounded-xl ">
          blogs
        </span>
        <span class="bg-white text-black text-lg font-medium mr-2 px-2.5 py-0.5 rounded-xl ">
          artist
        </span>
        <span class="bg-white text-black text-lg font-medium mr-2 px-2.5 py-0.5 rounded-xl ">
          podcast
        </span>
      </div>
      <CreatorList/>
    </>
  );
};

export default FindCreators;
