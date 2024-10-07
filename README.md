# VotiFi - Decentralized Voting Application


## Overview

The **VotiFi - Decentralized Voting Application** is designed to provide a secure and transparent voting experience by leveraging blockchain technology. Utilizing **Ethereum smart contracts**, this application ensures the integrity of the voting process while offering a user-friendly interface for both voters and election administrators. Additionally, the app supports **user authentication** with a backend powered by **Express.js** and **image uploads** powered by **MongoDB** for efficient storage of user data and images.


## Features

- **Blockchain-Based Voting:** Ensures security and transparency through decentralized smart contracts on the Ethereum network.
- **MetaMask Authentication:** Users can securely log in and sign transactions using MetaMask.
- **Election Management:** Election commissioners have the ability to start and end voting sessions, ensuring structured elections.
- **Dynamic Candidate Handling:** Easily manage candidate information, including adding or removing candidates.
- **Image Uploads:** Voter profile images are uploaded and stored securely using MongoDB.
- **Error Handling with Toast Notifications:** Any errors (e.g., authentication or transaction issues) are displayed with real-time toast notifications for a smooth user experience.
- **Responsive Design:** Built with React.js and Bootstrap for an optimized experience on any device.


## Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - Bootstrap 5
  - JavaScript 
  - React.js
  
- **Backend (Server side):**
  - Node.js 
  - Express.js

- **Backend (Database):**
  - MongoDB (for image storage)
    
- **Backend (Blockchain):**
  - Solidity
  - ethers.js (for frontend - blockchain interactions)

    
## To run the project in your local machine, follow these steps: 

### Prerequisites
- Node.js and npm installed
- MetaMask extension installed and configured

### Installation
1. **Clone the Repository:**
   
   ```bash
   git clone <repository-url>

2. **Open the *'Voting Server + Database'* folder in the terminal and run these commands:**
  - Install server dependencies:
    
    ```bash
    npm install
    ```
  - Start the server:

    ```bash
    npm start
    ```

3. **Open the *'Voting Front-End'* folder in the terminal and run these commands:**

- Install frontend dependencies:

    ```bash
    npm install
    ```
    
- Run the frontend application:

    ```bash
    npm run dev
    ```
