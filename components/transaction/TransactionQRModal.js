import Modal from "../Modal";
import {
  createQR,
  encodeURL,
  findReference,
  validateTransfer,
  FindReferenceError,
  ValidateTransferError,
} from "@solana/pay";
import { PublicKey, Keypair } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { useConnection } from "@solana/wallet-adapter-react";
import { useEffect, useRef, useState } from "react";
import { truncate } from "../../utils/string";
import { useCashApp } from "../../hooks/Pay";
import { getAvatarUrl } from "../../functions/getAvatarUrl";

const TransactionQRModal = ({
  modalOpen,
  setModalOpen,
  userAddress,
  setQrCode,
}) => {
  const [payam, setpayam] = useState(new BigNumber("0.25"));
  const { transactions, setTransactions } = useCashApp();
  const qrRef = useRef();
  const { connection } = useConnection();
  // Set the state to true to rerender the component with generated QR
  const loadQr = () => {
    setQrCode(true);
  };

  useEffect(() => {
    const recipient = new PublicKey(userAddress);
    const amount = payam;
    const reference = Keypair.generate().publicKey;
    const label = "shrine";
    const message = "Thanks for the Payment!";

    const urlParams = {
      recipient,
      amount,
      reference,
      label,
      message,
    };

    const url = encodeURL(urlParams);
    const qr = createQR(url, 488, "transparent");
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      qr.append(qrRef.current);
    }

    const interval = setInterval(async () => {
      // console.log("waiting for transaction confirmation")
      try {
        const signatureInfo = await findReference(connection, reference, {
          finality: "confirmed",
        });
        console.log("valdiating");
        await validateTransfer(
          connection,
          signatureInfo.signature,
          {
            recipient,
            amount,
            reference,
          },
          { commitment: "confirmed" }
        );

        //let's add the transaction to local storage
        const newID = (transactions.length + 1).toString();
        const newTransaction = {
          id: newID,
          from: {
            name: recipient,
            handle: recipient,
            avatar: getAvatarUrl(recipient.toString()),
            verified: true,
          },
          to: {
            name: reference,
            handle: "-",
            avatar: getAvatarUrl(reference.toString()),
            verified: false,
          },
          description: "User sent you SOL through Phantom App!",
          transactionDate: new Date(),
          status: "Completed",
          amount: amount,
          source: "-",
          identifier: "-",
        };

        setTransactions([newTransaction, ...transactions]);
        setModalOpen(false);

        clearInterval(interval);
      } catch (e) {
        if (e instanceof FindReferenceError) {
          //skip
          return;
        }
        if (e instanceof ValidateTransferError) {
          console.error("Transaction is invalid", e);
          return;
        }
        console.error("Unknown Error", e);
      }
    }, 500);

    return () => clearInterval(interval);
  });

  return (
    <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <div ref={qrRef} />
        </div>
        <div className="flex flex-col items-center justify-center space-y-1">
          {/* <p className="text-lg font-medium text-gray-800">{truncate(userAddress)}</p> */}
          <p className="flex justify-left mx-10 text-black text-xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-xl dark:text-white">
            scan to pay
          </p>
          {/* <p className="text-sm font-light text-gray-600">Scan to pay ${truncate(userAddress)}</p> */}

          <button
            onClick={() => loadQr()}
            className="w-full px-3 rounded-lg bg-black text-white py-3 hover:bg-opacity-70"
          >
            <span className="font-medium text-white mt-5">Load QR code</span>
          </button>

          <h1 className="flex justify-left mx-10 text-black text-xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-2xl dark:text-white">
            or
          </h1>
          <button
            onClick={() => setpayam(new BigNumber("0.50"))}
            className="w-full px-3 rounded-lg bg-black text-white py-3 hover:bg-opacity-70"
          >
            <span className="font-medium text-white mt-5">pay $0.50</span>
          </button>
          <button
            onClick={() => setpayam(new BigNumber("0.75"))}
            className="w-full px-3 rounded-lg bg-black text-white py-3 hover:bg-opacity-70"
          >
            <span className="font-medium text-white mt-5">pay $0.75</span>
          </button>
          <button
            onClick={() => setpayam(new BigNumber("0.1"))}
            className="w-full px-3 rounded-lg bg-black text-white py-3 hover:bg-opacity-70"
          >
            <span className="font-medium text-white mt-5">pay $0.1</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionQRModal;
