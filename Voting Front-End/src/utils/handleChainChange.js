import {toast} from "react-hot-toast"

export const handleChainChange = async (setWeb3State) => {
    let chainIdHex = await window.ethereum.request({
        method:'eth_chainId'
    })
    let chainId = parseInt(chainIdHex, 16);
    setWeb3State((prevState)=>({...prevState, chainId}))
    toast(`Detected change in chain!\n Your current chain ID is: ${chainId}`, {style: { 
        whiteSpace: 'pre-wrap', 
        overflowWrap: 'break-word', 
        wordBreak: 'break-word', 
        width: '300px', 
    }})
}
