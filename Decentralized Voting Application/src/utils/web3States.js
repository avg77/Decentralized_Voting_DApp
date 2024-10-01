import {ethers} from "ethers";
import votingAbi from "../constants/votingAbi.json";
import axios from "axios"
import {toast} from "react-hot-toast"

export const getWeb3State = async() => {
    let [contractInstance, selectedAccount, chainId, ifElectionCommission] = [null, null, null, null];
    try{
        if(!window.ethereum){
            toast.error("Metamask is not installed!")
        }
        const accounts = await window.ethereum.request({
            method:'eth_requestAccounts'
        })
        let chainIdHex = await window.ethereum.request({
            method:'eth_chainId'
        })
        chainId = parseInt(chainIdHex, 16);
        selectedAccount = accounts[0];
        //read operation
        const provider = new ethers.BrowserProvider(window.ethereum);
        //write operation
        const signer = await provider.getSigner();

        const message = "You accept the terms and conditions of this voting application!"
        const signature = await signer.signMessage(message)
        const dataSignature = {
            signature
        }
        const res = await axios.post(`http://localhost:3000/api/authentication?accountAddress=${selectedAccount}`, dataSignature)
        ifElectionCommission = res.data.ifElectionCommission;
        localStorage.setItem("token", res.data.token)
        const contractAddress = "0xe6c75a4bA7A20d5B81d696BE496422e38536A2E7";  //voting contract address on remix ide
        contractInstance = new ethers.Contract(contractAddress, votingAbi, signer);
        return {contractInstance, chainId, selectedAccount, ifElectionCommission, provider, signer};
    }
    catch (error) {
        console.error("Not able to fetch the web3States!", error.message);
        throw error;
    }
    
}



//0x302e11c7C85609bB4c5308AAf1e9CD0e5e5f92EE - erc20 contract address linked to voting contract
//0x3F0cD02ccc846Cb4D1aB783Ef02Af96755A07747 - token marketplace/exchange contract address linked to erc20 contract

//0xe6c75a4bA7A20d5B81d696BE496422e38536A2E7 - voting dapp contract address (linea sepolia)
//0x82Ef1A01DD5305cAa88Ef1bB3F8fb4789F419b71 - erc20 contract address (linea sepolia) 
//0x9A87dB053B6B5EcbAf6F495e4B65e9F1008b37E9 - token marketplace/exchange (linea sepolia)