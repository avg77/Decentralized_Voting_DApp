import React from 'react'
import { web3Context } from '../../context/web3Context';
import { useContext } from 'react';
import {toast} from "react-hot-toast"

const DeclareEmergency = () => {
    const{web3State} = useContext(web3Context);
    const {contractInstance} = web3State;

    const declareEmergency = async() => {
      try {
        const tx = await contractInstance.emergency();  //using ethers.js
        const receipt = await tx.wait()
        toast("Emergency Declared!", {icon: '⚠️'});
      } catch (error) {
        toast.error("Error declaring emergency!", error.message)
      }
            
    }
    
  return (
    <div>
        <button onClick={declareEmergency}>Declare Emergency</button>
    </div>
  )
}

export default DeclareEmergency;