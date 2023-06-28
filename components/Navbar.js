import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
//import { useBuzz } from "../Connector/buzz";
import { CiLogin } from "react-icons/ci";
//import { NavbarUtil } from "../utils/NavbarUtil";
import styles from "../styles/Wallet.module.css"
import { useRouter } from "next/router";
import Image from "next/image";
const Navbar = () => {
  const router = useRouter();
  console.log(router.asPath);
  //const { initialized } = useBuzz();
  const initialized = true;
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );
  const { word, home } = ["Login", true];

  return (
    <>
      <nav class="text-gray-600 body-font bg-transparent absolute top-0 left-0 right-0 z-50">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <a href="https://flowbite.com/" class="flex items-center">
            {/* <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-8 mr-3"
              alt="Flowbite Logo"
            /> */}
            <span class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-yellow-300 md:text-5xl lg:text-5xl dark:text-white">
              shrine.
            </span>
          </a>
          <div class="flex md:order-2 justify-center">
            
            <WalletMultiButtonDynamic className={styles.walletbutton} />
            <button
              data-collapse-toggle="navbar-cta"
              type="button"
              class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 bg-transparent"
            id="navbar-cta"
          >
            <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <a
                  href="#"
                  class="block  pl-3 pr-4 text-white  rounded md:bg-transparent md:p-0 font-bold tracking-tight text-lg"
                  aria-current="page"
                >
                  find creators
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block  pl-3 pr-4 text-white rounded md:hover:bg-transparent md:p-0 font-bold tracking-tight text-lg"
                >
                  my feed
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="block  pl-3 pr-4 text-white rounded md:hover:bg-transparent md:p-0 font-bold tracking-tight text-lg"
                >
                  about us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
