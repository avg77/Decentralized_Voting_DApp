import React from 'react'
import { useRef } from 'react'
import { ethers } from 'ethers'
import {toast} from "react-hot-toast"

const BuyToken = ({contractInstance}) => {

    const tokenAmountRef = useRef()
    const buyToken = async(e) => {
        try {
        e.preventDefault()
        const numberOfTokens = tokenAmountRef.current.value;
        const numberOfTokensAppend18Decimals = ethers.parseUnits(numberOfTokens, 18);
        const tokenPriceInWei = await contractInstance.tokenPrice();
        const totalPriceOfTokens = tokenPriceInWei*BigInt(numberOfTokens);
        const tx = await contractInstance.buyAVIToken(numberOfTokensAppend18Decimals, {value: totalPriceOfTokens})
        const receipt = await tx.wait()
        toast.success("Tokens bought successfully!", receipt)
        } catch (error) {
           toast.error("Failed to buy tokens!", error.message) 
        }
        
    }

  return (
    <div>
        <form onSubmit={buyToken}>
            <label>Token Amount To Buy: </label>
            <input type="text" ref={tokenAmountRef} placeholder='Enter number of tokens to buy' />
            <button>Buy Tokens</button>
        </form>
    </div>
  )
}

export default BuyToken