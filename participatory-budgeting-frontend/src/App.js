import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import WalletConnect from './components/WalletConnect';
import AddProposerForm from './components/AddProposerForm';
import ProjectForm from './components/ProjectForm';
import AddVoterForm from './components/AddVoterForm';
import VoteForm from './components/VoteForm';
import ProjectsList from './components/ProjectsList'

function App() {
  return (
    <Router>
      <div className="main-container">
        <nav>
          <ul>
            <li><Link to="/wallet-connect">Wallet Connect</Link></li>
            <li><Link to="/add-proposer">Add Proposer</Link></li>
            <li><Link to="/propose-project">Propose Project</Link></li>
            <li><Link to="/add-voter">Add Voter</Link></li>
            <li><Link to="/vote">Vote</Link></li>
            <li><Link to="/projectsList">Projects List</Link></li>
          </ul>
        </nav>
        
        <Switch>
          <Route path="/wallet-connect" component={WalletConnect} />
          <Route path="/add-proposer" component={AddProposerForm} />
          <Route path="/propose-project" component={ProjectForm} />
          <Route path="/add-voter" component={AddVoterForm} />
          <Route path="/vote" component={VoteForm} />
          <Route path="/projectsList" component={ProjectsList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
