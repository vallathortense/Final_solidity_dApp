// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "src/Proposer.sol";
import "src/ParticipatoryBudgeting.sol";

contract TestProposer {
    Proposer public proposerContract;
    address public authorizedAccount;

    constructor() {
        proposerContract = new Proposer();
        authorizedAccount = msg.sender; // Set an authorized account
    }

    function testAddProposer() external {
        // Authorize the account to add a proposer
        proposerContract.addProposer(authorizedAccount);

    }

    function testRemoveProposer() external {
        // Add the authorized account as a proposer
        proposerContract.addProposer(authorizedAccount);

        // Remove the authorized account as a proposer
        proposerContract.removeProposer(authorizedAccount);

    }
}
