import React, { useState, useEffect } from 'react';
import { getContract } from '../utils/getContract';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    async function loadProjects() {
      const contract = getContract();
      const total = await contract.methods.getTotalProjects().call();
      const projectArray = [];

      for (let i = 0; i < total; i++) {
        const project = await contract.methods.getProject(i).call();
        console.log(`Project ${i}: `, project);
        projectArray.push({
          id: i,
          admin: project[0],
          description: project[1],
          votes: project[2].toString(),
        });
      }

      setProjects(projectArray);
    }

    loadProjects();
  }, []);

  return (
    <div>
      <h2>Project Proposals</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <p>Project ID: {project.id}</p>
            <p>Proposer: {project.admin}</p>
            <p>Description: {project.description}</p>
            <p>Votes: {project.votes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
