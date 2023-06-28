import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  collapse,
  Boo,
  Chip,
} from "@material-tailwind/react";
import {BsFillClipboardFill} from 'react-icons/bs'
import dynamic from "next/dynamic";
import db from "../../db/db";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Wallet.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import checkboxColors from "@material-tailwind/react/theme/components/checkbox/checkboxColors";
import { FLIGHT_SERVER_CSS_MANIFEST } from "next/dist/shared/lib/constants";
export default function Example() {
  const router = useRouter();
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );
  const [isExist, setIsExist] = useState(false);
  const [activation, setActivation] = useState(false);
  const [loading, setLoading] = useState(false);
  const { connected, publicKey } = useWallet();
  const [walletConnected, setWalletConnected] = useState(false);
  const [pageName, setPageName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [socials, setSocials] = useState("");
  const [activationLink, setActivationLink] = useState();
  const [category, setCategory] = useState("");
  const [publish_afterPublish, setPublish_afterPublish] = useState("publish");
  const [publishICon, setPublishIcon] = useState(false);

  useEffect(() => {
    if (connected) {
      setWalletConnected(true);
      setWalletAddress(publicKey.toString());
      setIsExist(false);
    } else {
      setWalletConnected(false);
      setWalletAddress("");
    }
  }, [connected, publicKey]);

  useEffect(() => {
    const check_for_existing_account = async () => {
      const querySnapshot = await getDocs(collection(db, "cryptochat"));
      querySnapshot.forEach((doc) => {
        if (doc.data().address == walletAddress) {
          setIsExist(true);
        }
      });
    };
    check_for_existing_account();
  }, [walletAddress]);

  const nameHandler = (e) => {
    setPageName(e.target.value);
  };

  const walletAddressHandler = (e) => {
    setWalletAddress(e.target.value);
  };

  const socialsHandlers = (e) => {
    setSocials(e.target.value);
  };

  const create_donation_page = async () => {
    if ((walletAddress, pageName, socials)) {
      setLoading(true);
      await addDoc(collection(db, "cryptochat"), {
        address: walletAddress,
        name: pageName,
        socials: socials,
        category: category,
        profilePhoto:
          "https://firebasestorage.googleapis.com/v0/b/shrine-76128.appspot.com/o/wba.jpg?alt=media&token=12de3c4c-32b1-4878-9696-da77d7c24faf",
      });
    } else {
      alert("pls fill the details");
    }
    setLoading(false);
    setPublish_afterPublish("launch your donation page");
    setPublishIcon(true);
  };

  const goToDonationPage = () => {
    router.replace(`http://localhost:3000/cryptochat/${pageName}`);
  };

  const activate_donation_page = async () => {
    setActivationLink(`http://localhost:3000/cryptochat/${pageName}
           `);
    setActivation(true);
  };

  const handle_publish = () => {
    if (publish_afterPublish == "publish") {
      create_donation_page();
    }
    if (publish_afterPublish == "launch your donation page") {
      goToDonationPage();
    }
  };

  const copy_activationLink = () => {
    navigator.clipboard.writeText(`http://localhost:3000/cryptochat/${pageName}`)
  }

  return (
    <>
      <Navbar />
      {activation ? (
        <>
          <div className="flex justify-center py-36">
            <Card color="transparent" shadow={false}>
              <Typography variant="h2" color="white">
                publish your
              </Typography>
              <Typography
                variant="h2"
                className="font-extrabold text-yellow-300"
              >
                donation page now
              </Typography>

              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                  {/* <Input
                    className="w-full"
                      value={activationLink}
                      size="lg"
                      color="white"
                      label="what should be your page name"
                    /> */}
                  <div class="mb-6">
                    <label
                      for="default-input"
                      class="block text-xl font-semibold mb-2 text-white dark:text-white"
                    >
                      your page link
                    </label>
                    <div className="flex text-xl">
                      {publishICon ? (
                        <>
                          <label
                            for="default-input"
                            class="block font-semibold mb-4 text-white dark:text-white"
                          >
                            status : deployed
                          </label>
                          <span class="flex  mt-2.5 ml-2 w-3 h-3 bg-green-500 rounded-full"></span>
                        </>
                      ) : (
                        <>
                          <label
                            for="default-input"
                            class="block font-semibold mb-4 text-white dark:text-white"
                          >
                            status : not deployed
                          </label>
                          <span class="flex mt-2.5 ml-2 w-3 h-3 bg-red-500 rounded-full"></span>
                        </>
                      )}
                    </div>
                    <div className="flex justify-center">
                    <input
                      type="text"
                      id="default-input"
                      value={activationLink}
                      class="bg-black border border-white text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <BsFillClipboardFill onClick={()=> copy_activationLink()} className="text-3xl ml-2 mt-2 text-white cursor-pointer" />
                    </div>
                  </div>
                </div>
                {walletConnected ? (
                  <>
                    {loading ? (
                      <>
                        <div className="flex justify-center" role="status">
                          <svg
                            aria-hidden="true"
                            class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-300"
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
                        <button
                          onClick={() => handle_publish()}
                          type="button"
                          class="w-full text-white bg-black border border-white font-semibold rounded-full px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          {publish_afterPublish}
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <WalletMultiButtonDynamic className={styles.walletbutton} />
                  </>
                )}

                <Typography
                  color="white"
                  className="mt-4 text-center font-normal"
                >
                  do not want a donation page?{" "}
                  <a
                    href="#"
                    className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                  >
                    go back
                  </a>
                </Typography>
              </form>
            </Card>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center py-24">
            <Card color="transparent" shadow={false}>
              <Typography variant="h2" color="white">
                get yourself a personalized
              </Typography>
              <Typography
                variant="h2"
                className="font-extrabold text-yellow-300"
              >
                donation page
              </Typography>
              {/* <Typography color="white" className="mt-1 font-normal">
                  Enter your details to register.
                </Typography> */}
              <form className="mt-5 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-4 flex flex-col gap-6">
                  <div class="mb-1">
                    <label
                      for="default-input"
                      class="block font-semibold mb-2 text-white dark:text-white"
                    >
                      what should be your page name
                    </label>
                    <input
                      type="text"
                      id="small-input"
                      value={pageName}
                      onChange={nameHandler}
                      class="block w-full p-2 text-white border border-gray-300 rounded-lg bg-black focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div class="mb-1">
                    <label
                      for="default-input"
                      class="block font-semibold mb-2 text-white dark:text-white"
                    >
                      your socials
                    </label>
                    <input
                      type="text"
                      id="default-input"
                      value={socials}
                      placeholder=" https://example.com"
                      onChange={socialsHandlers}
                      class="block w-full p-2 text-white border border-gray-300 rounded-lg bg-black focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div class="mb-1">
                    <label
                      for="default-input"
                      class="block font-semibold mb-2 text-white dark:text-white"
                    >
                      your content category
                    </label>
                    <input
                      type="text"
                      id="default-input"
                      value={category}
                      //onChange={socialsHandlers}
                      class="block w-full p-2 text-white border border-gray-300 rounded-lg bg-black focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <div className="flex gap-2 mt-5">
                      <Chip
                        onClick={() => setCategory(category + "video")}
                        className="bg-white text-black"
                        value="video"
                      />
                      <Chip
                        onClick={() => setCategory(category + ", musician")}
                        className="bg-white text-black"
                        value="musician"
                      />
                      <Chip
                        onClick={() => setCategory(category + ", developer")}
                        className="bg-white text-black"
                        value="developer"
                      />
                      <Chip
                        onClick={() => setCategory(category + ", nft")}
                        className="bg-white text-black"
                        value="nft"
                      />
                      <Chip
                        onClick={() => setCategory(category + ", podcast")}
                        className="bg-white text-black"
                        value="podcast"
                      />
                    </div>
                  </div>
                  <div class="mb-1">
                    <label
                      for="default-input"
                      class="block font-semibold mb-2 text-white dark:text-white"
                    >
                      wallet address
                    </label>
                    <input
                      type="text"
                      id="default-input"
                      value={walletAddress}
                      onChange={walletAddressHandler}
                      class="block w-full p-2 text-white border border-gray-300 rounded-lg bg-black focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                {walletConnected ? (
                  <>
                    {isExist ? (
                      <>
                        <button
                          disabled={true}
                          type="button"
                          class="w-full border border-white text-white bg-gray-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-full  py-3 focus:outline-none"
                        >
                          page already exists , try with another wallet
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => activate_donation_page()}
                          type="button"
                          class="w-full border border-white text-white bg-black font-medium rounded-full py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          create your donation page
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <WalletMultiButtonDynamic />
                  </>
                )}

                <Typography
                  color="white"
                  className="mt-4 text-center font-normal"
                >
                  do not want a donation page?{" "}
                  <a
                    href="#"
                    className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                  >
                    go back
                  </a>
                </Typography>
              </form>
            </Card>
          </div>
        </>
      )}
    </>
  );
}
