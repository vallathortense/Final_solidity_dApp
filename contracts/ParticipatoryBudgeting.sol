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
        uint256 projectId;
        bool exists;
        mapping(address => bool) voters;
    }
    
    mapping(uint256 => Project) public projects;
    mapping(address => bool) public proposers;
    
    event ProjectProposed(uint256 projectId, address indexed admin, string description);
    event VoteCasted(address indexed voter, uint256 indexed projectId, uint256 votes);
    event FundsAllocated(uint256 indexed projectId, uint256 amount);
    
    constructor() {
    }
    /**
     * @notice addVoter is a function that allows a user to vote on a certain project 
     * @dev it requires the existence of the project and is only executable by the owner of the contract
     * @param _voter address of the person added to the voters of a project
     * @param _projectId uint256 reprensenting the id of the project the votr should be added to
    */
    function addVoter(address _voter, uint256 _projectId) external onlyOwner {
        require(projects[_projectId].exists, "Project does not exist");
        projects[_projectId].voters[_voter] = true;
    }

    /**
     * @notice addProposer allows a user to make project proposals
     * @dev this function is only executable by the owner
     * @param _proposer address of the user allowed to propose
    */
    function addProposer(address _proposer) external onlyOwner {
        proposers[_proposer] = true;
    }

    /**
     * @notice proposeProject is a function that allows a user to propose a project
     * @dev the user must be authorized by the owner before making a proposal
     * @param _description string describing the project
    */
    function proposeProject(string memory _description) external {
        require(proposers[msg.sender] == true, "You are not eligible to propose a project");
        uint256 projectId = totalProjects++;
        projects[projectId].admin = msg.sender;
        projects[projectId].description = _description;
        projects[projectId].votes = 0;
        projects[projectId].exists = true;
        emit ProjectProposed(projectId, msg.sender, _description);
    }
    /**
     * @notice vote for a project
     * @dev only users authorized by the owner can vote for the project
     * @param _projectId id that the voter wants to vote for
    */
    function vote(uint256 _projectId) external {
        require(projects[_projectId].exists, "Project does not exist");
        require(projects[_projectId].voters[msg.sender], "You are not eligible to vote for this project");
        
        projects[_projectId].votes = projects[_projectId].votes.add(1);
        projects[_projectId].voters[msg.sender] = false;
        emit VoteCasted(msg.sender, _projectId, projects[_projectId].votes);
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

    function getProject(uint256 projectId) public view returns (address, string memory, uint256) {
        require(projects[projectId].exists, "Project does not exist");
        Project storage project = projects[projectId];
        return (project.admin, project.description, project.votes);
    }

    function getTotalProjects() public view returns (uint256) {
        return totalProjects;
    }
}