import React, {useContext, useEffect} from 'react'
import { web3Context } from '../../context/web3Context'
import { useNavigate } from 'react-router-dom';
import "./Wallet.css";

function Wallet() {
    const navigateTo = useNavigate();
    const {handleWallet, web3State} = useContext(web3Context);
    const {selectedAccount} = web3State;

    useEffect(() => {
        if(selectedAccount){
            navigateTo("/landing-page")
        }
    },[selectedAccount, navigateTo])
  return (
    <div className="container">
    <h1>
     VotiFi
    </h1>
    <h2>
     Transforming Voting with Blockchain: Secure, Transparent, and Decentralized!
    </h2>
    <button className="cw-btn" onClick={handleWallet}>
     Connect Wallet
    </button>
    <div className="image-container">
     <img height="300" src="https://i.pinimg.com/474x/a7/e5/5d/a7e55de65e4bfd227d2de56edd49df8a.jpg" width="500"/>
    </div>
   </div>
  )
}

export default Wallet;