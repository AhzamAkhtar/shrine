import {
  collection,
  doc,
  getDoc,
  getDocs,
  queryEqual,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import HighightContet from "./HighightContent";
import FindCreators from "./FindCreators";
import { useConnection, useLocalStorage, useWallet } from "@solana/wallet-adapter-react";
import AirdropContent from "./AirdropContent";
import Footer from "./Footer";
import UpperHero from "./UpperHero";
import db from "../../db/db";
import { useRouter } from "next/router";
const HeroLD = () => {
  const router = useRouter();
  const [wallet_connected, setWalletConnected] = useState(false);
  const [userPublicKey, setUserPubicKey] = useState("");
  const [donationPageName , setDonationPageName] = useState("")
  const [donationPageHeading, setDonationPageHeading] = useState(
    "get a donation page"
  );
  const { connected, publicKey } = useWallet();
  useEffect(() => {
    if (connected) {
      setWalletConnected(true);
      setUserPubicKey(publicKey.toString());
    }
  }, [connected, publicKey]);

  useEffect(() => {
    const check_weather_donationpage_exists = async () => {
      const querySnapshot = await getDocs(collection(db, "cryptochat"));
      querySnapshot.forEach((doc) => {
        if (doc.data().address == userPublicKey) {
          setDonationPageHeading("go to your donation page");
          setDonationPageName(doc.data().name)
        }
      });
    };
    check_weather_donationpage_exists();
  }, [userPublicKey]);

  const handleProceeding = () => {
    if(donationPageHeading== "get a donation page") {
      router.push("http://localhost:3000/DonationForm/setup")
    }
    if(donationPageHeading == "go to your donation page") {
      router.push(`http://localhost:3000/donationPage/${donationPageName}`)
    }
  }

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
                class="inline-flex justify-center items-center py-3 text-lg px-5 font-semibold text-center text-black rounded-full bg-white  focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
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
                onClick={() =>
                  handleProceeding()
                }
                href="#"
                class="inline-flex justify-center items-center py-3 px-5 text-lg font-semibold text-center bg-white text-black rounded-full  border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                {donationPageHeading}
              </a>
            </div>
          </div>
        </section>
        <div>
          <UpperHero className="flex justify-center" />
        </div>
        <FindCreators />
        <HighightContet />
        <AirdropContent />
      </div>
      <Footer />
    </>
  );
};

export default HeroLD;
