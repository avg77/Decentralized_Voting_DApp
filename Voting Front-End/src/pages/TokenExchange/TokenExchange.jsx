import React, { useContext, useEffect, useState } from 'react'
import TokenBalance from '../../components/TokenExchange/TokenBalance';
import TokenPrice from '../../components/TokenExchange/TokenPrice';
import BuyToken from '../../components/TokenExchange/BuyToken';
import SellToken from '../../components/TokenExchange/SellToken';
import tokenExchangeAbi from '../../constants/tokenExchangeAbi.json'
import erc20Abi from "../../constants/erc20Abi.json"
import { web3Context } from '../../context/web3Context';
import { ethers } from 'ethers';

const TokenExchange = () => {
    const [tokenExchangeContractInstance, setTokenExchangeContractInstance] = useState(null)
    const [erc20ContractInstance, setErc20ContractInstance] = useState(null)
    const {web3State} = useContext(web3Context)
    const {signer,provider} = web3State;

    useEffect(() => {
        const erc20TokenInit = () => {
            const contractAddress = "0x82Ef1A01DD5305cAa88Ef1bB3F8fb4789F419b71"
            const erc20ContractInstance = new ethers.Contract(contractAddress, erc20Abi, signer)
            setErc20ContractInstance(erc20ContractInstance)
        }
        provider && erc20TokenInit()
    },[provider])

    useEffect(() => {
        const tokenExchangeInit = () => {
            const tokenExchangeContractAddress = "0x9A87dB053B6B5EcbAf6F495e4B65e9F1008b37E9"
            const tokenExchangeContractInstance = new ethers.Contract(tokenExchangeContractAddress, tokenExchangeAbi, signer)
            setTokenExchangeContractInstance(tokenExchangeContractInstance)
        }
        signer && tokenExchangeInit()
    },[signer])

  return (
    <div>
        <br />
       <TokenBalance erc20ContractInstance={erc20ContractInstance}/>
       <br />
       <TokenPrice contractInstance = {tokenExchangeContractInstance}/>
       <br />
       <BuyToken contractInstance = {tokenExchangeContractInstance}/>
       <br />
       <SellToken erc20ContractInstance={erc20ContractInstance} contractInstance = {tokenExchangeContractInstance}/>
    </div>
  )
}

export default TokenExchange;