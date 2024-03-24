import React, { useState } from 'react';
import { getContract } from '../utils/getContract';

export default function ProjectForm() {
    const [description, setDescription] = useState('');
    const [feedback, setFeedback] = useState('');

    const proposeProject = async () => {
        try {
            const contract = getContract();
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const response = await contract.methods.proposeProject(description).send({ from: accounts[0] });
    
            if (response.events.ProjectProposed) {
                const event = response.events.ProjectProposed.returnValues;
                setFeedback({
                    projectId: `${event.projectId}`,
                    proposerAddress: `${event.admin}`, // Make sure 'admin' matches the event parameter
                    description: `${event.description}`
                });
            } else {
                console.log("ProjectProposed event not found in the response.");
            }
    
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
                    <p><strong>Proposer Address:</strong> {feedback.proposerAddress}</p>
                    <p><strong>Description:</strong> {feedback.description}</p>
                </div>
            )}
        </div>
    );    
}