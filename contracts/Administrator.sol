// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./@openzeppelin/contracts/access/Ownable.sol";

/// @title Administrator
/// @dev Contract to manage administrators/proposers of projects of the participatory budgeting system.
contract Administrator is Ownable {
    mapping(address => bool) public administrators;

    event AdministratorAdded(address indexed account);
    event AdministratorRemoved(address indexed account);

    /// @notice Add a new administrator.
    /// @dev Can only be called by the contract owner.
    /// @param _account Address of the new administrator.
    function addAdministrator(address _account) external onlyOwner {
        administrators[_account] = true;
        emit AdministratorAdded(_account);
    }

    /// @notice Remove an existing administrator.
    /// @dev Can only be called by the contract owner.
    /// @param _account Address of the administrator to be removed.
    function removeAdministrator(address _account) external onlyOwner {
        administrators[_account] = false;
        emit AdministratorRemoved(_account);
    }
}
