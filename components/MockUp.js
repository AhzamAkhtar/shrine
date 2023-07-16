import React from 'react'
import {
    collection,
    doc,
    getDoc,
    getDocs,
    queryEqual,
  } from "firebase/firestore";
  
import { useRouter } from 'next/router';  
import Link from 'next/link';
import db from '../db/db';
import { useState , useEffect } from 'react';
import { useConnection, useLocalStorage, useWallet } from "@solana/wallet-adapter-react";
const MockUp = () => {
    const router = useRouter()
    const [wallet_connected, setWalletConnected] = useState(false);
    const [donationPageName, setDonationPageName] = useState("")
    const [donationPageHeading, setDonationPageHeading] = useState(
        "get a donation page"
    );
    const { connected, publicKey } = useWallet();
    const [userPublicKey, setUserPubicKey] = useState("");
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
        if (donationPageHeading == "get a donation page") {
            router.push("http://localhost:3000/DonationForm/setup")
        }
        if (donationPageHeading == "go to your donation page") {
            router.push(`http://localhost:3000/donationPage/${donationPageName}`)
            
        }
    }
    return (
        <>
            <div className='flex justify-between bg-black'>
                <div className=''>
                    <div className='flex justify-center py-24'>
                        <section class="bg-black dark:bg-gray-900 p-5">
                            <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
                                <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl dark:text-white">get your donation page now</h1>
                                <p class="mb-8 text-xl font-semibold text-yellow-100 lg:text-3xl sm:px-16 lg:px-48 dark:text-gray-400">creating a vibrant ecosystem of giving: empowering content creators with customized donation pages to foster community engagement and financial independence</p>
                                <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                                    <a
                                        onClick={() =>
                                            handleProceeding()
                                        }
                                        href="#"
                                        class="inline-flex justify-center items-center py-3 px-5 text-xl font-semibold text-center bg-white text-black rounded-full  border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                    >
                                        {donationPageHeading}
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>

                </div>
                <div className='m-10'>
                    <>



                        <div class="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[454px] max-w-[341px] md:h-[682px] md:max-w-[512px]">
                            <div class="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                            <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                            <div class="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                            <div class="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                            <div class="rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800">
                                <img src="https://firebasestorage.googleapis.com/v0/b/shrine-76128.appspot.com/o/new%20donat.png?alt=media&token=cb22c20d-fa83-4547-96f4-f55735e767a7" class="dark:hidden h-[426px] md:h-[654px]" alt="" />
                                <img src="https://firebasestorage.googleapis.com/v0/b/shrine-76128.appspot.com/o/new%20donat.png?alt=media&token=cb22c20d-fa83-4547-96f4-f55735e767a7" class="hidden dark:block h-[426px] md:h-[654px]" alt="" />
                            </div>
                        </div>

                    </>
                </div>
            </div>
        </>
    )
}

export default MockUp