import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import dynamic from "next/dynamic";
import Navbar from "../../components/Navbar";
import { useState,useEffect} from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
export default function Example() {
  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );
  const { connected, publicKey } = useWallet();
  const [walletConnected, setWalletConnected] = useState(false);
  const [pageName, setPageName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [socials, setSocials] = useState("");

  useEffect(() => {
    if (connected) {
      setWalletConnected(true);
      setWalletAddress(publicKey.toString());
    }
  }, [connected, publicKey]);

  const nameHandler = (e) => {
    setPageName(e.target.value);
  };

  const walletAddressHandler = (e) => {
    setWalletAddress(e.target.value);
  };

  const socialsHandlers = (e) => {
    setSocials(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center py-36">
        <Card color="transparent" shadow={false}>
          <Typography variant="h2" color="white">
            get yourself a personalized
          </Typography>
          <Typography variant="h2" color="blue">
            donation page
          </Typography>
          <Typography color="white" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                value={pageName}
                onChange={nameHandler}
                size="lg"
                color="white"
                label="what should be your page name"
              />
              <Input
                value={socials}
                onChange={socialsHandlers}
                size="lg"
                color="white"
                label="your socials"
              />
              <Input
                value={walletAddress}
                onChange={walletAddressHandler}
                color="white"
                size="lg"
                label="wallet address"
              />
            </div>
            {walletConnected ? (
              <>
              <Button className="mt-6" fullWidth>
              lets goo!!
            </Button>
              </>
            ):(
              <>
                <WalletMultiButtonDynamic/>
              </>
            )}

           
            <Typography color="white" className="mt-4 text-center font-normal">
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
  );
}
