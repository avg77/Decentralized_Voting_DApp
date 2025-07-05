import { ethers } from "ethers";
import votingAbi from "../constants/votingAbi.json";
import axios from "axios";
import { toast } from "react-hot-toast";

export const getWeb3State = async () => {
  let [contractInstance, selectedAccount, chainId, ifElectionCommission] = [null, null, null, null];

  try {
    if (!window.ethereum) {
      toast.error("Metamask is not installed!");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    const chainIdHex = await window.ethereum.request({
      method: "eth_chainId"
    });

    chainId = parseInt(chainIdHex, 16);
    selectedAccount = accounts[0];

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const message = "You accept the terms and conditions of this voting application!";
    const signature = await signer.signMessage(message);
    
    const dataSignature = { signature };

    const res = await axios.post(
      `http://localhost:3000/api/authentication?accountAddress=${selectedAccount}`,
      dataSignature
    );

    ifElectionCommission = res.data.ifElectionCommission;
    localStorage.setItem("token", res.data.token);

    const contractAddress = "0x65eD6e0fc5b6B9c6Ff9C6C565845128E34d3630B"; //voting contract address
    contractInstance = new ethers.Contract(contractAddress, votingAbi, signer);

    return { contractInstance, chainId, selectedAccount, ifElectionCommission, provider, signer };

  } catch (error) {
    console.error("❌ Not able to fetch the web3States!", error.message);
    throw error;
  }
};
