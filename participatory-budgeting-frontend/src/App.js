import React from 'react';
import ProjectForm from './components/ProjectForm';
import VoteForm from './components/VoteForm';
import WalletConnect from './components/WalletConnect';

function App() {
  return (
    <div>
      <h1>Participatory Budgeting</h1>
      <WalletConnect />
      <ProjectForm />
      <VoteForm />
    </div>
  );
}

export default App;