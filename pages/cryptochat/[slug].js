import React, { useEffect, useState } from "react";
import { AiFillYoutube } from "react-icons/ai";
import Image from "next/image";
import { useCashApp } from "../../hooks/Pay";
import GenQR from "../../components/transaction/GenQR";
import TransactionQRModal from "../../components/transaction/TransactionQRModal";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import db from "../../db/db";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useWallet } from "@solana/wallet-adapter-react";

const PaymentModal = (props) => {
  const { connected, userPublickey } = useWallet();
  const [userPubkey, setUserPubkey] = useState(
    "11111111111111111111111111111111"
  );
  const [data, setData] = useState([]);
  const user = props.slug;
  const { doTransaction, amount, setAmount } = useCashApp();
  const [price, setPrice] = useState("$0.75");
  const [color, setColor] = useState("orange-400");
  const [transactionQRModalOpen, setTransactionQRModalOpen] = useState(false);
  const [qrCode, setQrCode] = useState(false);
  const [message, setMessage] = useState();
  const [msgColor, setMsgColor] = useState("orange-400");
  const [showChat, setShowChat] = useState(false);
  const [messageData, setmessageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toggleHeading , setToggleHeading] = useState("Show Chat")

  const { publicKey, userAddress } = useCashApp();

  useEffect(() => {
    if (connected) {
      setUserPubkey(publicKey.toString());
    }
  }, [connected]);

  console.log(userPubkey);

  useEffect(() => {
    setLoading(true);
    const getMessageData = async () => {
      const array = [];
      const querySnapshot = await getDocs(collection(db, "message"));
      querySnapshot.forEach((doc) => {
        array.push(doc.data());
      });
      setmessageData(array);
      setLoading(false);
    };
    getMessageData();
    console.log(messageData);
  }, []);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "cryptochat"));
      querySnapshot.forEach((doc) => {
        if (doc.data().name == user) {
          setData(doc.data());
          setLoading(false);
        }
      });
    };
    getData();
  }, []);

  const pay = async (receiver) => {
    await doTransaction({
      amount,
      receiver,
      amount,
    });
    setMessage("");
    setPrice("$0.25");
    setColor("green-500");
  };

  const addMessage = async () => {
    await addDoc(collection(db, "message"), {
      name: user,
      message: message,
      amount: amount,
      msgColor: msgColor,
      from: userPubkey,
    });
  };

  const messageHandler = (e) => {
    setMessage(e.target.value);
  };

  const execute = () => {
    pay(data.address);
    if (message) {
      addMessage();
    }
  };

  const toggle = () => {
    setShowChat(!showChat);

    if(toggleHeading=="Show Chat"){
      setToggleHeading("Support")
    }
    if(toggleHeading =="Support"){
      setToggleHeading("Show Chat")
    }
  };

  return (
    <>
      <Navbar />
      <Hero />

      {showChat ? (
        <>
          <section class="text-gray-600 body-font mx-5 py-24">
            <div className="flex justify-center">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  checked
                  onClick={() => toggle()}
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ml-3 text-sm font-medium text-white dark:text-gray-300">
                  {toggleHeading}
                </span>
              </label>
            </div>
            <div class="container px-20 py-5 mx-auto ">
              <div class="flex flex-wrap -m-5 px-24 py-1 sm:px-2 ">
                {messageData.map((item, keys) => {
                  return (
                    <>
                      {loading ? (
                        <>
                          <Image
                            src="/yellowLoader.gif"
                            width={50}
                            height={50}
                            className="m-auto"
                          />
                        </>
                      ) : (
                        <>
                          <div class="xl:w-1/3 md:w-1/2 p-4">
                            <div
                              class={`border border-gray-200 p-6 rounded-lg bg-white`}
                            >
                              <h2
                                class={`text-lg text-${item.msgColor} font-medium title-font mb-2`}
                              >
                                amount
                              </h2>
                              {/* <div class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                <svg
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  class="w-6 h-6"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                              </div> */}
                              <h2
                                class={`text-xl text-${item.msgColor} font-medium title-font mb-2`}
                              >
                                ${item.amount}
                              </h2>
                              <h2 class="leading-relaxed text-base">
                                message :
                              </h2>
                              <p class="leading-relaxed text-xl mt-2">
                                {item.message}
                              </p>
                              <p class="leading-relaxed text-base mt-2">
                                from : 96bnZMD...
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <div className="flex justify-center absolute w-full items-center py-5 mt-10 rounded-xl">
            <div class="bg-black w-1/3 p-10 rounded-3xl">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  onClick={() => toggle()}
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ml-3 text-sm font-medium text-white dark:text-gray-300">
                  {toggleHeading}
                </span>
              </label>
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
                  {loading ? (
                    <>
                      <div role="status" className="flex justify-center">
                        <svg
                          aria-hidden="true"
                          class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>
                    </>
                  ) : (
                    <>
                    <img
                    src={data.profilePhoto}
                    alt="..."
                    className="shadow-lg rounded-full max-w-full h-auto align-middle border-none mt-5"
                  />
                    </>
                  )}
                  
                  <div className="flex  justify-center items-center mx-auto ">
                    <h2 class="text-base font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-lg dark:text-white text-center mt-2">
                      {data.name}
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
                    setMsgColor("green-500");
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
                    setMsgColor("blue-500");
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
                    setMsgColor("orange-400");
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
                    setMsgColor("red-500");
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
                  onChange={messageHandler}
                  value={message}
                  name="message"
                  placeholder="any message from your side ..."
                  class="w-full mt-4 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-10 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></input>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => execute()}
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
        </>
      )}

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

export async function getServerSideProps(context) {
  const { slug } = context.query;
  console.log(`slug is my ${slug}`);
  return {
    props: { slug },
  };
}

export default PaymentModal;
