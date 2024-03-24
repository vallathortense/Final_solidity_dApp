import React, { useState } from 'react';
import { getContract } from '../utils/getContract';

export default function AddProposerForm() {
    const [address, setAddress] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const addProposer = async () => {
        try {
            const contract = getContract(); // Make sure this util returns the instantiated contract
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            await contract.methods.addProposer(address).send({ from: accounts[0] });

            setStatusMessage(`Successfully added ${address} as a proposer.`);
        } catch (error) {
            console.error("Error adding proposer:", error);
            setStatusMessage("Failed to add proposer. See console for details.");
        }
    };

    return (
        <div>
            <h2>Add Proposer</h2>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter proposer address"
            />
            <button onClick={addProposer}>Add Proposer</button>
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
}
