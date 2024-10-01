import React from 'react'
import { web3Context } from '../../context/web3Context';
import { useContext } from 'react';
import {toast} from "react-hot-toast"

const RemoveEmergency = () => {
    const{web3State} = useContext(web3Context);
    const {contractInstance} = web3State;

    const removeEmergency = async() => {
      try {
        const tx = await contractInstance.endEmergency();  //using ethers.js
        const receipt = await tx.wait()
        toast("Emergency Removed!", {icon: '⚠️'});
      } catch (error) {
        toast.error("Error removing emergency!", error.message)
      }
            
        }
    
  return (
    <div>
        <button onClick={removeEmergency}>Remove Emergency</button>
    </div>
  )
}

export default RemoveEmergency;