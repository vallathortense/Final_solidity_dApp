import React, { useState } from 'react';
import { getContract } from '../utils/getContract';

export default function ProjectForm() {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contract = getContract();
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    try {
      await contract.methods.proposeProject(description).send({ from: accounts[0] });
      alert('Project proposed successfully');
    } catch (error) {
      console.error(error);
      alert('Error proposing project');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Project Description:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">Propose Project</button>
    </form>
  );
}
