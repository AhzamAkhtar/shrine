{
  /*<h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the world’s potential</h1>*/
}
import React from "react";
import HighightContet from "./HighightContent";

const HeroLD = () => {
  return (
    <>
      <div className="py-24 mt-10">
        <section class="bg-black dark:bg-gray-900">
          <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
            <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white">
              {" "}
              breaking the chains :{" "}
              <span className="text-yellow-300 dark:text-blue-500">
                embrace a membership platform{" "}
              </span>
              free from fees
            </h1>
            <p class="mb-8 text-xl font-semibold text-yellow-100 lg:text-3xl sm:px-16 lg:px-48 dark:text-gray-400">
              escape the grasp of intermediaries, and embrace a membership
              platform that preserves your earnings.
            </p>
            <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <a
                href="#"
                class="inline-flex justify-center items-center py-3 px-5 text-lg font-medium text-center text-black rounded-3xl bg-white  focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
               start a paid membership
                {/* <svg
                  aria-hidden="true"
                  class="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg> */}
              </a>
              <a
                href="#"
                class="inline-flex justify-center items-center py-3 px-5 text-lg font-medium text-center bg-white text-black rounded-3xl  border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                get a donation page
              </a>
            </div>
          </div>
        </section>
        <HighightContet/>
      </div>
    </>
  );
};

export default HeroLD;
