import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddress,
  getMint,
} from "@solana/spl-token";
import BigNumber from "bignumber.js";
//
import { useWallet } from "@solana/wallet-adapter-react";
const usdcAddress = new PublicKey(
  "2Jb3ESx6sZtATAuiNBJJ2EtqaAJazox6WXJ8kaAENEcn"
);

export const recieveSFT = () => {
  const { sendTransaction } = useWallet();
  const recieveSFTfun = async (buyerpubkey, sellerPubkey, amount) => {
    //buyer jo khareedega and seller jaha jaaega
    //const buyer = "qZGxJPUkLraCzkAv5K7R2SjeFNLLTQRevmfihvGE79D";
    const buyer = new PublicKey(buyerpubkey);

    const sellerPublicKey = new PublicKey(sellerPubkey);

    const itemPrice = amount;

    const bigAmount = BigNumber(itemPrice);
    const buyerPublicKey = new PublicKey(buyer);
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network);
    const connection = new Connection(endpoint);

    const buyerUsdcAddress = await getAssociatedTokenAddress(
      usdcAddress,
      buyerPublicKey
    );
    const shopUsdcAddress = await getAssociatedTokenAddress(
      usdcAddress,
      sellerPublicKey
    );

    const { blockhash } = await connection.getLatestBlockhash("finalized");

    const usdcMint = await getMint(connection, usdcAddress);

    const tx = new Transaction({
      recentBlockhash: blockhash,
      feePayer: sellerPublicKey,
    });

    const transferInstruction = createTransferCheckedInstruction(
      buyerUsdcAddress,
      usdcAddress,
      shopUsdcAddress,
      buyerPublicKey,
      bigAmount,
      usdcMint.decimals
    );

    tx.add(transferInstruction);

    const serializedTransaction = tx.serialize({
      requireAllSignatures: false,
    });

    const base64 = serializedTransaction.toString("base64");
    console.log(base64);

    const tr = Transaction.from(Buffer.from(base64, "base64"));
    console.log(tr);

    const txnHash = await sendTransaction(tx, connection);
  };
  return {
    recieveSFTfun,
  };
};
