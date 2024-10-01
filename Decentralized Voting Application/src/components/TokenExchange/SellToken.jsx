import React, { useRef } from 'react';
import { ethers } from "ethers";
import { parseEther } from 'ethers';
import {toast} from "react-hot-toast"

const SellToken = ({ contractInstance, erc20ContractInstance }) => {
    /* const sellTokenAmountRef = useRef();
    const approveTokenAmountRef = useRef();

    const sellToken = async (e) => {
        try {
            e.preventDefault();
            const tokenValueInEth = sellTokenAmountRef.current.value;
            const tokenValueInWei = parseEther(tokenValueInEth);
            const tx = await contractInstance.sellAVIToken(tokenValueInWei);
            const receipt = await tx.wait();
            toast.success("Tokens sold successfully!", receipt);
        } catch (error) {
            toast.error("Token sell failed!", error.message);
        }
    };

    const approveToken = async (e) => {
        e.preventDefault();
        try {
            const tokenValueInEth = approveTokenAmountRef.current.value;
            const tokenValueInWei = parseEther(tokenValueInEth);
            const tokenExchange = "0x9A87dB053B6B5EcbAf6F495e4B65e9F1008b37E9";
            const tx = await erc20ContractInstance.approve(tokenExchange, tokenValueInWei, {
                gasLimit: 300000 
            });
            const receipt = await tx.wait();
            toast.success("Approved!", receipt);
        } catch (error) {
            console.error("Failed to approve!", error.message);
        }};


    return (
        <>
            <form onSubmit={sellToken}>
                <label>Token Amount To Sell (In ETH):</label>
                <input type="text" ref={sellTokenAmountRef} placeholder='Enter token amount to sell'></input>
                <button type="submit">Sell Token</button>
            </form>
            <br />
            <form onSubmit={approveToken}>
                <label>Token Amount To Approve (In ETH):</label>
                <input type="text" ref={approveTokenAmountRef} placeholder='Enter token amount to approve'></input>
                <button type="submit">Approve Token</button>
            </form>
        </>
    ); */
};

export default SellToken;
