import React, { useState, useContext } from 'react';
import { getContract } from '../utils/getContract';

export default function VoteForm() {
    const [projectId, setProjectId] = useState('');
    const [transactionHash, setTransactionHash] = useState('');
    const [votingError, setVotingError] = useState('');

    const voteForProject = async () => {
        if (!projectId) {
            alert("Please enter a project ID.");
            return;
        }

        try {
            const contract = getContract(); // Assuming this function instantiates your contract
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const response = await contract.methods.vote(projectId).send({ from: accounts[0] });
            
            setTransactionHash(response.transactionHash); // Capture the transaction hash of the vote
            alert("Vote successfully cast!");
        } catch (error) {
            console.error("Voting error:", error);
            setVotingError(error.message);
        }
    };

    return (
        <div>
            <h2>Vote for a Project</h2>
            <input
                type="text"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                placeholder="Enter Project ID"
            />
            <button onClick={voteForProject}>Vote</button>
            {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
            {votingError && <p>Error: {votingError}</p>}
        </div>
    );
}
