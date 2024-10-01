export const handleAccountChange = async (handleWallet) => {
    handleWallet();
} 




/* import toast from "react-hot-toast";

export const handleAccountChange = async (setWeb3State) => {
    const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
    })
    let selectedAccount = accounts[0];
    setWeb3State((prevState)=>({...prevState, selectedAccount}))
    toast(`Detected change in account address!\n Your current account address is: ${selectedAccount}`, {style: { 
        whiteSpace: 'pre-wrap', 
        overflowWrap: 'break-word', 
        wordBreak: 'break-word', 
        width: '300px', 
    }})
} */