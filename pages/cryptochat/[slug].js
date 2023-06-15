import React, { useState } from "react";
import { AiFillYoutube } from "react-icons/ai";
import Image from "next/image";
import { useCashApp } from "../../hooks/Pay";
import GenQR from "../../components/transaction/GenQR";
import TransactionQRModal from "../../components/transaction/TransactionQRModal";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import { useRouter } from "next/router";
import db from "../../db/db";
import { collection, getDocs } from "firebase/firestore";

const PaymentModal = () => {
  const router = useRouter();
  const { user } = router.query;
  const { doTransaction, receiver, amount, setAmount } = useCashApp();
  const [price, setPrice] = useState("$0.75");
  const [color, setColor] = useState("orange-400");
  const [transactionQRModalOpen, setTransactionQRModalOpen] = useState(false);
  const [qrCode, setQrCode] = useState(false);

  const { publicKey, userAddress } = useCashApp();

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "cryptochat"));
    querySnapshot.forEach((doc) => {
      if(doc.data().name=="wba"){
        console.log(doc.data().desc);
      }
    });
  };
getData()

  const pay = async () => {
    await doTransaction({
      amount,
      receiver,
      amount,
    });
  };
  return (
    <>
      <Navbar />
      <Hero />
      <div className="flex justify-center absolute w-full items-center py-5 mt-10 rounded-xl">
        <div class="bg-black w-1/3 p-10 rounded-3xl">
          <div className="flex justify-between">
            <h2 class="text-lg font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-3xl dark:text-white">
              crypto chat
            </h2>
            <h2 class="text-lg font-extrabold leading-none tracking-tight text-yellow-300 md:text-5xl lg:text-lg dark:text-white">
              points - 100+
            </h2>
          </div>
          <p class="text-xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-lg mt-2 dark:text-white">
            support content creators with crypto
          </p>
          <div className="flex flex-wrap justify-center">
            <div className="w-6/12 sm:w-4/12">
              <img
                src="../../wba.jpg"
                alt="..."
                className="shadow-lg rounded-full max-w-full h-auto align-middle border-none mt-5"
              />
              <div className="flex  justify-center items-center mx-auto ">
                <h2 class="text-base font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-lg dark:text-white text-center mt-2">
                  WEB3 Builder
                </h2>
                <AiFillYoutube className="text-red-600 mt-auto mx-auto  text-3xl" />
              </div>
            </div>
          </div>

          <div class="relative mb-4">
            <h2 class="text-lg font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-3xl dark:text-white">
              amount
            </h2>
            <h1
              className={`text-lg font-extrabold leading-none tracking-tight text-${color} md:text-5xl lg:text-5xl dark:text-white text-center`}
            >
              {price}
            </h1>
          </div>
          <div className="flex justify-between mt-2 ">
            <button
              class="bg-white text-green-500  py-2 px-2 rounded-lg text-lg font-extrabold leading-none tracking-tight md:text-5xl lg:text-xl dark:text-white "
              onClick={() => {
                setPrice("$0.25");
                setColor("green-500");
                setAmount(0.25);
              }}
            >
              send $.25
            </button>
            <button
              class="bg-white text-blue-500  py-2 px-2 rounded-lg text-lg font-extrabold leading-none tracking-tight md:text-5xl lg:text-xl dark:text-white "
              onClick={() => {
                setPrice("$0.50");
                setColor("blue-500");
                setAmount(0.5);
              }}
            >
              send $.50
            </button>
            <button
              class="bg-white text-orange-400  py-2 px-2 rounded-lg text-lg font-extrabold leading-none tracking-tight md:text-5xl lg:text-xl dark:text-white "
              onClick={() => {
                setPrice("$0.75");
                setColor("orange-400 ");
                setAmount(0.75);
              }}
            >
              send $.75
            </button>
            <button
              class="bg-white text-red-500  py-2 px-2 rounded-lg text-lg font-extrabold leading-none tracking-tight md:text-5xl lg:text-xl dark:text-white "
              onClick={() => {
                setPrice("$0.1");
                setColor("red-500");
                setAmount(0.1);
              }}
            >
              send $0.1
            </button>
          </div>
          <div class="relative mb-4">
            <h2 class="text-lg font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-xl mt-4 dark:text-white">
              any message
            </h2>
            <input
              id="message"
              name="message"
              placeholder="any message from your side ..."
              class="w-full mt-4 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-10 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            ></input>
          </div>
          <div className="flex justify-center">
            <button
              onClick={pay}
              className={`text-black w-2/3 mx-1 bg-white border-0  py-2 px-4 focus:outline-none rounded-lg text-lg  font-extrabold leading-none tracking-tight  md:text-5xl lg:text-xl dark:text-white`}
            >
              send {price}
            </button>

            <div class="flex w-1/3 text-2xl items-center justify-center px-4 py-2 space-x-2 border border-gray-300 rounded-md bg-white text-gray-800">
              {/* <Action setModalOpen={setNewTransactionModalOpen} /> */}

              <GenQR
                setModalOpen={setTransactionQRModalOpen}
                userAddress={userAddress}
                setQrCode={setQrCode}
              />
              <TransactionQRModal
                modalOpen={transactionQRModalOpen}
                setModalOpen={setTransactionQRModalOpen}
                userAddress={userAddress}
                myKey={publicKey}
                setQrCode={setQrCode}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <section class="text-gray-600 body-font ">
        <div class="container px-2 py-20 mx-auto m-auto flex sm:flex-nowrap flex-wrap">
          
          <div class="lg:w-1/2 md:w-1/2 bg-transparent rounded-xl overflow-hidden sm:mr-10 p-10 mx-5 flex items-end justify-start relative">
            <div
              width="100%"
              height="100%"
              class="absolute inset-0 bg-black rounded-3xl"
              frameborder="0"
              title="map"
              marginheight="0"
              marginwidth="0"
              scrolling="no"
              src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=%C4%B0zmir+(My%20Business%20Name)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
            >
              <h2 className="flex justify-left mx-10 text-white text-8xl    font-extrabold leading-none tracking-tight md:text-5xl lg:text-8xl dark:text-white">
                support
              </h2>
              <h2 className="flex justify-left mx-10 text-white text-8xl    font-extrabold leading-none tracking-tight md:text-5xl lg:text-8xl dark:text-white">
                your
              </h2>
              <h2 className="flex justify-left mx-10 text-yellow-300 text-8xl mt-5 mb-4  font-extrabold leading-none tracking-tight md:text-5xl lg:text-8xl dark:text-white">
                faviourite creator's
              </h2>
              <h2 className="flex justify-left mx-10  text-white text-8xl   font-extrabold leading-none tracking-tight md:text-5xl lg:text-8xl dark:text-white">
                and get rewarded.
              </h2>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default PaymentModal;
