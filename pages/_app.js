import '../styles/globals.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import { WalletConnectProvider } from "../components/WalletConnectProvider";
function MyApp({ Component, pageProps }) {
  return(
    <WalletConnectProvider>
   
    <Component {...pageProps} />
    </WalletConnectProvider>
  ) 
}

export default MyApp
