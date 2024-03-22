// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ParticipatoryBudgeting is Ownable(msg.sender) {
    using SafeMath for uint256;

    uint256 public totalProjects;
    
    struct Project {
        address admin;
        string description;
        uint256 votes;
        bool exists;
        mapping(address => bool) votersByCountry;
    }
    
    mapping(uint256 => Project) public projects;
    
    event ProjectProposed(uint256 projectId, address indexed admin, string description);
    event VoteCasted(address indexed voter, uint256 indexed projectId);
    event FundsAllocated(uint256 indexed projectId, uint256 amount);
    
    constructor() {
    }
    
    function addVoter(address _voter, uint256 _projectId) external onlyOwner {
        projects[_projectId].votersByCountry[_voter] = true;
    }
    
    function proposeProject(string memory _description) external {
        uint256 projectId = totalProjects++;
        projects[projectId].admin = msg.sender;
        projects[projectId].description = _description;
        projects[projectId].votes = 0;
        projects[projectId].exists = true;
        emit ProjectProposed(projectId, msg.sender, _description);
    }
    
    function vote(uint256 _projectId) external {
        require(projects[_projectId].exists, "Project does not exist");
        require(!projects[_projectId].votersByCountry[msg.sender], "You are not eligible to vote for this project");
        
        projects[_projectId].votes = projects[_projectId].votes.add(1);
        projects[_projectId].votersByCountry[msg.sender] = true;
        emit VoteCasted(msg.sender, _projectId);
    }
    
    function allocateFunds(uint256 _projectId, uint256 _amount) external onlyOwner {
        require(projects[_projectId].exists, "Project does not exist");
        
        // Calculate the total number of votes across all projects
        uint256 totalVotes = 0;
        for (uint256 i = 0; i < totalProjects; i++) {
            if (projects[i].exists) {
                totalVotes = totalVotes.add(projects[i].votes);
            }
        }
        
        // Calculate the proportion of votes for the project
        uint256 projectVotes = projects[_projectId].votes;
        uint256 proportion = projectVotes.mul(_amount).div(totalVotes);
        
        // Transfer funds to the project admin
        payable(projects[_projectId].admin).transfer(proportion);
        
        emit FundsAllocated(_projectId, proportion);
    }
}
