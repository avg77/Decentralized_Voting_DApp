# 🗳️ VotiFi: A Decentralized Voting System Powered by Filecoin & Ethereum

## Track
- Decentralized Economies, Governance & Science

## 🧠 Problem
Conventional voting systems—be it digital or manual—are often plagued by:
- **Centralized control**, leading to possible manipulation or bias.
- **Lack of transparency**, making it difficult to audit or verify.
- **No voter privacy** or **limited security guarantees**.
- **Impermanent data storage**, risking the loss of critical voter/candidate records.

## 💡 Solution
**VotiFi** is a secure, transparent, and tamper-proof **blockchain-based voting platform**.  
It leverages:
- **Ethereum smart contracts** to enforce fair voting logic,
- **IPFS (via Pinata & Lighthouse)** to store immutable voter/candidate images,
- **Filecoin** for permanent decentralized storage, and
- **ERC20 tokens** to gate voting access, ensuring only authorized voters can participate.

Users can:
- Register as **voters** or **candidates** with image proof.
- Cast votes during a defined election window.
- View real-time results and vote counts.
- Admins can trigger **emergency halts**, reset elections, or announce results.

## 🚀 Architecture

```
[ Voter/Candidate ]
       ⬇️ Upload Image
[ Express + Multer Server ]
       ⬇️ IPFS (Dual Integration - Pinata & Lighthouse)
[ Smart Contract Stores CIDs ]
       ⬇️ Render Images via Gateways
[ Frontend (React + Ethers.js) ]
       ⬆️ Smart Contract Interactions
[ Ethereum + Filecoin Backend ]
```

### Storage Redundancy
- IPFS via [Pinata](https://pinata.cloud/)
- Filecoin-native IPFS via [Lighthouse](https://www.lighthouse.storage/)

> CID fallback is dynamically handled during fetch via gateway URLs.

## 🔗 Bounty Integration
This project integrates with:
- **Filecoin/IPFS** via Pinata and Lighthouse SDKs
- **Permanent Data Preservation** through Filecoin-backed deals
- **Ethereum** smart contracts for vote logic deployed on Filecoin - Calibration Testnet
- **ERC-20 Token gating** to validate legitimate voters before they vote


## 📦 Tech Stack

| Layer             | Stack                                             |
|------------------|---------------------------------------------------|
| 💻 Frontend       | React, Vite, Ethers.js, React Router, Toastify    |
| ⚙️ Backend        | Node.js, Express, Multer, Pinata SDK, Lighthouse SDK |
| 🧠 Smart Contract | Solidity (OpenZeppelin, ERC20)                    |
| 🔐 Auth & State   | JWT Auth, MetaMask, Context API                   |
| 🧠 Blockchain     | Ethereum (Testnet)                                |
| 📦 Storage        | IPFS + Filecoin (via Pinata & Lighthouse)         |

## 🧪 How to Run

### 📦 Install Dependencies
```bash
# Root-level
npm install

# Frontend
cd Voting\ Front-End
npm install

# Server
cd ../Voting\ Server
npm install
```

### 🧼 Set Environment Variables
Create `.env` files in the backend and server directories:

#### 🔐 Voting Server `.env`
```env
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret
LIGHTHOUSE_API_KEY=your_lighthouse_api_key
JWT_SECRET=your_jwt_secret
```

### 🧠 Compile & Deploy Smart Contract
Use Hardhat or your preferred method (Remix IDE etc):

### 🚀 Start the App
```bash
# Server
cd Voting\ Server
npm start

# Frontend
cd ../Voting\ Front-End
npm run dev
```

## 🔥 Features

- ✅ Voter & Candidate Registration (with image)
- ✅ ERC20 Token-gated Voting
- ✅ Real-time Voting & Vote Count
- ✅ Image uploads stored permanently (Filecoin + IPFS)
- ✅ Admin controls: start/halt/end/reset elections
- ✅ CID fallback logic in image rendering
- ✅ Fully integrated authentication (JWT + MetaMask)

## 👨‍👩‍👦 Team
- Solo

| Name    | Role         |
|---------|--------------|
| Aviral Gupta  | Full-Stack Dev, Solidity, IPFS/Filecoin Integration, Frontend, Ethers.js, MetaMask |

- Social Handles
  > [LinkedIn](https://www.linkedin.com/in/guptaaviral/)
  
  > [X/Twitter](https://x.com/gupta_avi7)
  
  > Discord Username: skulz@4808
  
## 📝 License
MIT License. Use it, fork it, build on top of it. Just don’t vote twice 😉
