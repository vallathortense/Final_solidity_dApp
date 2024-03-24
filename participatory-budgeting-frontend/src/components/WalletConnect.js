import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

export default function WalletConnect() {
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable().then(() => setConnected(true));
        }
    }, []);

    return (
        <div>
            {connected ? (
                "Wallet connected. You can now vote on projects."
            ) : (
                "Connect your wallet to vote on projects."
            )}
        </div>
    );
}
