import React from 'react'
import { web3Context } from '../../context/web3Context';
import { useContext } from 'react';
import {toast} from "react-hot-toast"

const ResetElection = () => {
    const{web3State} = useContext(web3Context);
    const {contractInstance} = web3State;

    const resetElection = async() => {
      try {
        const tx = await contractInstance.resetElection();  //using ethers.js
        const receipt = await tx.wait()
        toast("Election has been reset!", {icon: '⚠️'});
      } catch (error) {
        toast.error("Error re-setting election!", error.message)
      }
            
    }
    
  return (
    <div>
        <button onClick={resetElection}>Reset Election</button>
    </div>
  )
}

export default ResetElection;