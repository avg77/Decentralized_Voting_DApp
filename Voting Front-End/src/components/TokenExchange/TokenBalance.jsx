import React, { useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { web3Context } from '../../context/web3Context'
import {toast} from "react-hot-toast"

const TokenBalance = ({erc20ContractInstance}) => {
    const {web3State} = useContext(web3Context)
    const {selectedAccount} = web3State

    const [marketplaceBalance, setMarketplaceBalance] = useState("0")
    const [userTokenBalance, setUserTokenBalance] = useState("0")
    
    useEffect(() => {
        const fetchMarketplaceBalance = async() => {
        try {
            const tokenBalanceInWei = await erc20ContractInstance.balanceOf("0x3a4ab5AE178355eC79EA36281785d1C01074E146")
            const tokeBalanceInEth = ethers.formatEther(tokenBalanceInWei)
            setMarketplaceBalance(tokeBalanceInEth)
        } catch (error) {
            toast.error("Error fetching marketplace balance!", error.message)
        }
            
        }
        erc20ContractInstance && fetchMarketplaceBalance()
    },[erc20ContractInstance])

    useEffect(() => {
        const fetchTokenBalance = async() => {
        try {
            const tokenBalanceInWei = await erc20ContractInstance.balanceOf(selectedAccount)
            const tokeBalanceInEth = ethers.formatEther(tokenBalanceInWei)
            setUserTokenBalance(tokeBalanceInEth)
        } catch (error) {
            toast.error("Error fetching your token balance!", error.message)
        }
            
        }
        erc20ContractInstance && fetchTokenBalance()
    },[erc20ContractInstance,selectedAccount])
    
  return (
    <>
    <div>Token Marketplace Balance: <span style={{ color: 'yellow'}}>{marketplaceBalance}</span> </div>
    <br />
    <div>Your Token Balance: <span style={{ color: 'yellow'}}>{userTokenBalance}</span> </div>
    </>
  )
}

export default TokenBalance