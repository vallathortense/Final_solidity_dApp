import React, { useState } from 'react';
import { getContract } from '../utils/getContract';

export default function VoteForm() {
  const [projectId, setProjectId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contract = getContract();
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    try {
      await contract.methods.vote(projectId).send({ from: accounts[0] });
      alert('Vote cast successfully');
    } catch (error) {
      console.error(error);
      alert('Error casting vote');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Project ID:
        <input
          type="number"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        />
      </label>
      <button type="submit">Cast Vote</button>
    </form>
  );
}