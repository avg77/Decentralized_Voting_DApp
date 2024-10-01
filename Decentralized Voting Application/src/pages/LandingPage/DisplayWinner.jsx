import React, { useContext, useEffect, useState } from 'react'
import { web3Context } from '../../context/web3Context'
import {toast} from "react-hot-toast"

const DisplayResult = () => {
    const {web3State} = useContext(web3Context);
    const {contractInstance} = web3State;

    const [winner, setWinner] = useState("Not declared yet!");

    useEffect(() => {
        const displayWinner = async() => {
            try {
                const electionWinner = await contractInstance.winner();
                if(electionWinner!=="0x0000000000000000000000000000000000000000"){
                    setWinner(electionWinner);
                } 
            } catch (error) {
                toast.error("Error fetching the winner status!", error.message)
            }
        }
        contractInstance && displayWinner();
    },[contractInstance])

  return (
    <div>
      <p><span style={{ fontSize: '1.5rem' }}>Winner:</span> <span style={{ color: 'yellow', fontSize: '1.5rem' }}>{winner}</span></p>
      </div>
  )
}

export default DisplayResult;