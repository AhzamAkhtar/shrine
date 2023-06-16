import { useState,useEffect } from "react";
import { getAvatarUrl } from "../functions/getAvatarUrl"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js"
import BigNumber from "bignumber.js"


export const useCashApp = () => {
    
    const {connected, publicKey, sendTransaction} = useWallet();
    const [userAddress, setUserAddress] = useState("11111111111111111111111111111111")
    const [avatar, setAvatar] = useState("")
    const {connection} = useConnection()
    const [amount,setAmount] = useState(0.25)
    const [receiver, setReceiver] = useState('')
    const [transactionPurpose, setTransactionPurpose] = useState('')
    const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false)


    // const useLocalStorage = (storageKey, fallBackState) =>{
    //     const[value,setValue]=useState(
    //         JSON.parse(localStorage.getItem(storageKey)) ?? fallBackState
    //     )

    //     useEffect(()=>{
    //         localStorage.setItem(storageKey, JSON.stringify(value));
    //     },[value, setValue])

    //     return [value,setValue]
    // }

    // const [transactions, setTransactions] = useLocalStorage("transactions",[])

    // Get Avatar based on the userAddress
    useEffect(() => {
        if(connected){
            setUserAddress(publicKey.toString())
            setAvatar(getAvatarUrl(userAddress));
        }
        
    },[connected])


    const makeTransaction = async(fromWallet, toWallet, amount, reference) => {
        const network = WalletAdapterNetwork.Devnet
        const endpoint= clusterApiUrl(network)
        const connection= new Connection(endpoint)

        const {blockhash} = await connection.getLatestBlockhash('finalized')

        const transaction = new Transaction({
             recentBlockhash:blockhash,
             feePayer: fromWallet
        })

        const transferInstruction = SystemProgram.transfer({
            fromPubkey: fromWallet,
            lamports: amount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
            toPubkey: toWallet,
        })

        transferInstruction.keys.push({
            pubkey: reference,
            isSigner:false,
            isWritable:false,
        })

        transaction.add(transferInstruction)

        return transaction 
    } 


    const doTransaction = async ({amount, receiver, transactionPurpose}) => {

        const fromWallet= publicKey
        const toWallet = new PublicKey(receiver)
        const bnAmount = new BigNumber(amount)
        const reference = Keypair.generate().publicKey 
        const transaction= await makeTransaction(fromWallet, toWallet, bnAmount, reference) 
        
         const txnHash = await sendTransaction(transaction, connection)
         console.log(txnHash)

        //const newID = (transactions.lenght + 1).toString()
        // const newTransaction = {
        //     id: newID,
        //     from: {
        //         name: publicKey,
        //         handle: publicKey,
        //         avatar: avatar,
        //         verified: true,
        //     },
        //     to:{
        //         name: receiver,
        //         handle: '-',
        //         avatar: getAvatarUrl(receiver.toString()),
        //         verified: false,
        //     },
        //     description: transactionPurpose,
        //     transactionDate: new Date(),
        //     status:"Completed",
        //     amount: amount,
        //     source: '-',
        //     identifier: '-',
        // };
        // setNewTransactionModalOpen(false)
        //setTransactions([newTransaction, ...transactions])
    }

    

    return { connected,
             publicKey, 
             avatar, 
             userAddress, 
             doTransaction, 
             amount, 
             setAmount, 
             receiver, 
             setReceiver, 
             transactionPurpose, 
             setTransactionPurpose,
            //  transactions,
            //  setTransactions,
             newTransactionModalOpen, 
             setNewTransactionModalOpen,
            }

            
}

