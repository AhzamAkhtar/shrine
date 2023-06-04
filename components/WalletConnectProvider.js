import {WalletAdapterNetwork} from '@solana/wallet-adapter-base'
import {ConnectionProvider,WalletProvider} from '@solana/wallet-adapter-react'
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui'
import {GlowWalletAdapter,PhantomWalletAdapter,SlopeWalletAdapter} from '@solana/wallet-adapter-wallets'
import {clusterApiUrl} from '@solana/web3.js'
import {useMemo} from 'react'

export const WalletConnectProvider = ({children}) =>{
    const network = WalletAdapterNetwork.Devnet

    const endpoint = useMemo(()=>{
        if(network ===WalletAdapterNetwork.Devnet){
            return 'https://solemn-ancient-liquid.solana-devnet.discover.quiknode.pro/1849a9a948872208a291c23da45c385169c01a70/'
        }

        return clusterApiUrl(network)
    },[network])

    const wallets = useMemo(()=>[new PhantomWalletAdapter()],[network])

    return(
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets = {wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}