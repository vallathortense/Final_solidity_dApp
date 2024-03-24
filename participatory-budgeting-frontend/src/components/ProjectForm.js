import React, { useState } from 'react';
import { getContract } from '../utils/getContract';

export default function ProjectForm() {
    const [description, setDescription] = useState('');
    const [feedback, setFeedback] = useState(null);

    const proposeProject = async () => {
        try {
            const contract = getContract();
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const response = await contract.methods.proposeProject(description).send({ from: accounts[0] });

            // Listen for the ProjectProposed event
            contract.events.ProjectProposed({
                filter: { proposer: accounts[0] },
                fromBlock: 'latest'
            }, function(error, event) {
                if (error) {
                    console.error("Event listening error:", error);
                } else {
                    setFeedback({
                        projectId: event.returnValues.projectId,
                        proposer: event.returnValues.proposer,
                        description: event.returnValues.proposalDetails
                    });
                }
            });

            alert("Proposal submitted successfully!");
        } catch (error) {
            console.error("Proposal submission error:", error);
            alert("Error submitting proposal");
        }
    };

    return (
        <div>
            <h2>Propose a Project</h2>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter project description"
            />
            <button onClick={proposeProject}>Propose</button>
            {feedback && (
                <div>
                    <p><strong>Project ID:</strong> {feedback.projectId}</p>
                    <p><strong>Proposer Address:</strong> {feedback.proposer}</p>
                    <p><strong>Description:</strong> {feedback.description}</p>
                </div>
            )}
        </div>
    );
}

