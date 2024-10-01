import React, { useEffect, useState } from 'react';
import { getWeb3State } from '../utils/web3States';
import { handleAccountChange } from '../utils/handleAccountChange';
import { handleChainChange } from '../utils/handleChainChange';
import { web3Context } from './web3Context';
import { toast } from "react-hot-toast";

const Web3StateProvider = ({ children }) => {
    const [web3State, setWeb3State] = useState({
        contractInstance: null,
        chainId: null,
        selectedAccount: null,
        ifElectionCommission: null,
        provider: null,
        signer: null
    });

    const handleWallet = async () => {
        try {
            // Reset state to handle new account data
            setWeb3State({
                contractInstance: null,
                chainId: null,
                selectedAccount: null,
                ifElectionCommission: null,
                provider: null,
                signer: null
            });

            const { contractInstance, chainId, selectedAccount, ifElectionCommission, provider, signer } = await getWeb3State();
            toast.success("Metamask wallet connected successfully!", { duration: 2000 });
            console.log(contractInstance, chainId, selectedAccount, ifElectionCommission, provider, signer);
            setWeb3State({ contractInstance, chainId, selectedAccount, ifElectionCommission, provider, signer });
        } catch (error) {
            toast.error("Metamask wallet connection failed!", error.message);
        }
    };

    useEffect(() => {
        const handleAccountsChanged = () => {
            handleAccountChange(handleWallet);
        };

        const handleChainChanged = () => {
            handleChainChange(setWeb3State);
        };

        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);

        return () => {
            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
            window.ethereum.removeListener('chainChanged', handleChainChanged);
        };
    }, []);

    return (
        <web3Context.Provider value={{ web3State, handleWallet }}>
            {children}
        </web3Context.Provider>
    );
};

export default Web3StateProvider;
