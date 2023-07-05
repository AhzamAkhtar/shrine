import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic';
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
import { useRouter } from 'next/router'
import { BsFillClipboardFill } from 'react-icons/bs'
import styles from "../../styles/Wallet.module.css";
import { useWallet } from "@solana/wallet-adapter-react";
import Navbar from '../../components/Navbar';
import Share from '../../components/Share';
const DonationPage = (props) => {
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );
  const [walletConnected, setWalletConnected] = useState(false)
  const { connected, publicKey } = useWallet();
  const [activationLink, setActivationLink] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const user = props.slug

  useEffect(() => {
    if (connected) {
      setWalletConnected(true);
      setActivationLink(`http://localhost:3000/cryptochat/${user}`)
    } else {
      setWalletConnected(false);
    }
  }, [connected]);


  const copy_activationLink = () => {
    navigator.clipboard.writeText(`http://localhost:3000/cryptochat/${user}`)
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center py-36">
        <Card color="transparent" shadow={false}>
          <Typography variant="h2" color="white">
            welcome back,
          </Typography>
          <Typography
            variant="h2"
            className="font-extrabold text-yellow-300"
          >
            {user}
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
                  <>
                    <label
                      for="default-input"
                      class="block font-semibold mb-4 text-white dark:text-white"
                    >
                      status : deployed
                    </label>
                    <span class="flex  mt-2.5 ml-2 w-3 h-3 bg-green-500 rounded-full"></span>
                  </>
                </div>
                <div className="flex justify-center">
                  <input
                    type="text"
                    id="default-input"
                    value={activationLink}
                    class="bg-black border border-white text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <BsFillClipboardFill onClick={() => copy_activationLink()} className="text-3xl ml-2 mt-2 text-white cursor-pointer" />
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
                    onClick={()=> router.push(activationLink)}
                      type="button"
                      class="w-full text-white bg-black border border-white font-semibold rounded-full px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      launch your donation page
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

      <>
        <div className='flex justify-center'>
          <Card color="transparent" shadow={false}>
            <Typography variant="h2" color="white">
              share your link
            </Typography>
            <Typography className="text-yellow-300 mb-10" variant="h2">
              with your audience
            </Typography>
          </Card>
        </div>
        <Share user={user} />
      </>
    </>

  )
}
export async function getServerSideProps(context) {
  const { slug } = context.query;
  console.log(`slug is my ${slug}`);
  return {
    props: { slug },
  };
}
export default DonationPage