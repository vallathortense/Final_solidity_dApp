// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./@openzeppelin/contracts/access/Ownable.sol";

/// @title Proposer
/// @dev Contract to manage Proposers/proposers of projects of the participatory budgeting system.
contract Proposer is Ownable {
    mapping(address => bool) public Proposers;

    event ProposerAdded(address indexed account);
    event ProposerRemoved(address indexed account);

    /// @notice Add a new Proposer.
    /// @dev Can only be called by the contract owner.
    /// @param _account Address of the new Proposer.
    function addProposer(address _account) external onlyOwner {
        Proposers[_account] = true;
        emit ProposerAdded(_account);
    }

    /// @notice Remove an existing Proposer.
    /// @dev Can only be called by the contract owner.
    /// @param _account Address of the Proposer to be removed.
    function removeProposer(address _account) external onlyOwner {
        Proposers[_account] = false;
        emit ProposerRemoved(_account);
    }
}
