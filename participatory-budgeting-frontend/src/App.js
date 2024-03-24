import React from 'react';
import WalletConnect from './components/WalletConnect';
import ProjectForm from './components/ProjectForm';
import VoteForm from './components/VoteForm';
import AddProposerForm from './components/AddProposerForm';
import AddVoterForm from './components/AddVoterForm';

function App() {
  return (
    <div>
      <h1>Participatory Budgeting</h1>
      <WalletConnect />
      <AddProposerForm />
      <AddVoterForm />
      <ProjectForm />
      <VoteForm />
    </div>
  );
}

export default App;