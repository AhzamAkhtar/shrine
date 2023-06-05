import React from 'react'
import { useCashApp } from '../../hooks/Pay'
import { BsQrCodeScan } from "react-icons/bs";
const GenQR = ({ setModalOpen, userAddress, setQrCode }) => {

    const onProfileOpen = () => {
        setModalOpen(true)
        setQrCode(false)
    }

    const {amount, setAmount, receiver, setReceiver, transactionPurpose, setTransactionPurpose, doTransaction}=useCashApp()

    const onAmountInput = (e) => {
      e.preventDefault()
      const newAmount = e.target.value

      setAmount(newAmount)

      const input = document.querySelector('input#amount')
      input.style.width = newAmount.length + 'ch'
  }
  
  return (
    <div>
      
    <button onClick={onProfileOpen}>
       
        <BsQrCodeScan/>
     
    </button>
</div>
  )
}

export default GenQR