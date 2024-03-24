import React, { useState } from 'react';
import Web3 from 'web3';

export default function WalletConnect() {
    const [connected, setConnected] = useState(false);
    const [account, setAccount] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum);
                // Request account access if needed
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                // Accounts now exposed, set the first account as the default account
                setAccount(accounts[0]);
                setConnected(true);
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    return (
        <div>
            {connected ? (
                <p>Wallet connected: {account}</p>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
}
