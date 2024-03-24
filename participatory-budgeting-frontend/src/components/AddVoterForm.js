import React, { useState } from 'react';
import { getContract } from '../utils/getContract';

export default function AddVoterForm() {
    const [projectId, setProjectId] = useState('');
    const [voterAddress, setVoterAddress] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const addVoter = async () => {
        try {
            const contract = getContract();
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            await contract.methods.addVoter(projectId, voterAddress).send({ from: accounts[0] });

            setStatusMessage(`Voter ${voterAddress} successfully added to project ${projectId}.`);
        } catch (error) {
            console.error("Error adding voter:", error);
            setStatusMessage("Failed to add voter. See console for details.");
        }
    };

    return (
        <div>
            <h2>Add Voter to Project</h2>
            <input
                type="text"
                value={voterAddress}
                onChange={(e) => setVoterAddress(e.target.value)}
                placeholder="Project ID"
            />
            <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                placeholder="Voter Address"
            />
            <button onClick={addVoter}>Add Voter</button>
            {statusMessage && <p>{statusMessage}</p>}
        </div>
    );
}
