import React, { useContext } from 'react'
import { web3Context } from '../../context/web3Context'
import {toast} from "react-hot-toast"

const AnnounceResult = () => {
  const {web3State} = useContext(web3Context);
  const {contractInstance} = web3State;

    const announceResult = async() => {
      try {
        const tx = await contractInstance.result();  //using ethers.js
        const receipt = await tx.wait()  
        toast.success("Result Announced!");
      } catch (error) {
        toast.error("Error announcing the result!", error.message)
      }
        
    }

  return (
    <div>
        <button className='ec-btn' onClick={announceResult}>Announce Result</button>
    </div>
  )
}

export default AnnounceResult;