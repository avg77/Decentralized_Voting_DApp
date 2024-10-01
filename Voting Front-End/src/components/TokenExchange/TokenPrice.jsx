import React, { useEffect } from 'react'
import { useState } from 'react'
import { ethers } from 'ethers'
import {toast} from "react-hot-toast"

const TokenPrice = ({contractInstance}) => {
   const [tokenPrice, setTokenPrice] = useState(null) 

   useEffect(() => {
    const fetchTokenPrice = async() => {
        try {
            const tokenPriceInWei = await contractInstance.tokenPrice();
            const tokenPriceInEth = ethers.formatEther(tokenPriceInWei)
            setTokenPrice(tokenPriceInEth) 
        } catch (error) {
            toast.error("Error fetching token price!", error.message)
        }
        
    }
    contractInstance && fetchTokenPrice()
   },[contractInstance])
  return (
    <div>Current Token Price: <span style={{ color: 'yellow'}}>{tokenPrice} ETH</span></div>
  )
}

export default TokenPrice