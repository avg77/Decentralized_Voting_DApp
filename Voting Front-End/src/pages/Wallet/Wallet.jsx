import React, { useContext, useEffect } from "react";
import { web3Context } from "../../context/web3Context";
import { useNavigate } from "react-router-dom";
import "./Wallet.css";

function Wallet() {
  const navigateTo = useNavigate();
  const { handleWallet, web3State } = useContext(web3Context);
  const { selectedAccount } = web3State;

  useEffect(() => {
    if (selectedAccount) {
      navigateTo("/landing-page");
    }
  }, [selectedAccount, navigateTo]);

  return (
    <>
      <div className="wallet-container">
        <div className="left-section">
          <h1>🗳️ VotiFi</h1>
          <p className="tagline">
            Transforming Democracy with Blockchain: Secure, Transparent, Tamper-proof Voting
          </p>
          <button className="cw-btn" onClick={handleWallet}>
            Connect Wallet to Continue
          </button>
        </div>

        <div className="right-section">
          <div className="image-crop-wrapper">
            <img
              src="https://blue-hidden-beaver-868.mypinata.cloud/ipfs/bafkreiaekehgld6oxjhffxh5eetogmodqspswojftzx7e272lksvynxwgu"
              alt="Voting Illustration"
            />
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>🔍 About VotiFi</h2>
        <p>
          VotiFi is a decentralized voting platform built on Ethereum. It empowers democratic participation
          using blockchain to ensure transparency, verifiability, and immutability in every vote cast. Candidates and voters are KYCed and verified through decentralized storage platforms like IPFS and Filecoin.
        </p>
      </div>

      <div className="how-it-works">
        <h2>⚙️ How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1️⃣ Register</h3>
            <p>Register as a voter or candidate with your details and image on IPFS.</p>
          </div>
          <div className="step">
            <h3>2️⃣ Verify</h3>
            <p>Your identity is verified and stored immutably using decentralized storage.</p>
          </div>
          <div className="step">
            <h3>3️⃣ Vote</h3>
            <p>Vote securely using your wallet and earn trustless results powered by smart contracts.</p>
          </div>
        </div>
      </div>

      <div className="token-utility">
        <h2>💰 AVI Token Utility</h2>
        <ul>
          <li>🔐 Required for Casting a Vote</li>
          <li>🎁 Powers Access to Voter Privileges</li>
          <li>📈 Tracks Participation History</li>
        </ul>
      </div>

      <div className="why-votify">
        <h2>🤔 Why Choose VotiFi?</h2>
        <div className="why-grid">
          <div className="why-item">
            <h4>🧾 Verifiable Elections</h4>
            <p>Every transaction is traceable and auditable on-chain.</p>
          </div>
          <div className="why-item">
            <h4>🌐 Truly Decentralized</h4>
            <p>No single authority controls the vote — it's all smart contracts.</p>
          </div>
          <div className="why-item">
            <h4>🔐 Voter Privacy</h4>
            <p>Only you can access your profile. Your vote remains anonymous.</p>
          </div>
          <div className="why-item">
            <h4>🧠 Easy to Use</h4>
            <p>Intuitive interface, zero gas fees (if deployed on L2 or testnets).</p>
          </div>
        </div>
      </div>

      <footer className="footer-cta">
        <h2>🌍 Ready to Revolutionize Voting?</h2>
        <button className="cw-btn" onClick={handleWallet}>
          Connect Wallet & Begin
        </button>
        <p className="footer-note">Built for the PLGenesis Hackathon 2025</p>
      </footer>
    </>
  );
}

export default Wallet;
