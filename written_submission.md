# Voting dApp: Participatory Budgeting

### Project Description

Our project aims to develop a user-friendly dApp for participatory budgeting, leveraging blockchain technology to ensure transparent and inclusive fund allocation. By enabling administrators to propose projects and citizens to vote without disclosing budget details, we promote democratic decision-making. Traditional budgeting methods often lack transparency and citizen engagement, which our dApp addresses by providing a secure platform. Through blockchain, we enhance process integrity, fostering trust and accountability. Ultimately, our streamlined approach empowers communities to prioritize projects based on merit, leading to more responsive and inclusive political systems.

### Team Members

- Nicolas De Chambost
- Yuren Jin
- Maximo Mucientes
- Hortense Vallat

### Technical Specification


Metamask connection of the user and frontend implementation : 
![image](https://github.com/vallathortense/Final_solidity_dApp/assets/95473956/226f25fb-f81f-40f7-a938-af89392851a1)

Different roles are specified in the contract:
- the Owner of the `Proposer` contract handles the list of proposers
```
/// @notice Add a new Proposer.
/// @dev Can only be called by the contract owner.
/// @param _account Address of the new Proposer.
function addProposer(address _account) external onlyOwner {
    Proposers[_account] = true;
    emit ProposerAdded(_account);
}
``` 

- the Owner of the `ParticipatoryBudgeting` contract that can choose when allocating the budget and authorize voting
```
function addVoter(address _voter, uint256 _projectId) external onlyOwner {
    require(projects[_projectId].exists, "Project does not exist");
    projects[_projectId].voters[_voter] = true;
}
```
- a proposer can propose a Project and get allocating some funding from the owner:

```    
function proposeProject(string memory _description) external {
        require(proposers[msg.sender] == true, "You are not eligible to propose a project");
        uint256 projectId = totalProjects++;
        projects[projectId].admin = msg.sender;
        projects[projectId].description = _description;
        projects[projectId].votes = 0;
        projects[projectId].exists = true;
        emit ProjectProposed(projectId, msg.sender, _description);
    }
```

- a voter can vote for projects
```
function vote(uint256 _projectId) external {
    require(projects[_projectId].exists, "Project does not exist");
    require(projects[_projectId].voters[msg.sender], "You are not eligible to vote for this project");
    
    projects[_projectId].votes = projects[_projectId].votes.add(1);
    projects[_projectId].voters[msg.sender] = false;
    emit VoteCasted(msg.sender, _projectId, projects[_projectId].votes);
}
```

![diagram final solidity](https://github.com/vallathortense/Final_solidity_dApp/assets/95473956/30fafbb4-0e27-433d-8ba5-5d3d4ea9946f)


To incentivize participation: add some NFT rewards.

### Project SDLC process milestones and timeline
