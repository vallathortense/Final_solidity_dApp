import Web3 from 'web3';
import ParticipatoryBudgetingABI from '../contracts/ParticipatoryBudgetingABI.json';
import RewardTokenABI from '../contracts/RewardTokenABI.json'; // Import the RewardToken ABI

// Contract addresses
// const contractAddress = '0xc9CDcE80a136cdAFD65AfFaEE3d408808F00486f';
// const contractAddress = '0x50d5837B447c5041b2fC15e2d4A1E70a9E539229';
// const contractAddress = '0x25a01Ccc4c242F6F6dc7B73e68d44f92f4D47F30';
// const contractAddress = '0xe5428901FDd64832344C044Ea4cf9eC8360D4000';
const participatoryBudgetingAddress = '0x2113613843C9616CC81010CE0eA79Dd9F10a09D4';
const rewardTokenAddress = '0x90C37748d3906C507936a54DeAa44DA242fCDB0E';

let participatoryBudgetingContract = null;
let rewardTokenContract = null; // Declare a variable to hold the RewardToken contract instance

export const getParticipatoryBudgetingContract = () => {
  if (!participatoryBudgetingContract) {
    const web3 = new Web3(window.ethereum);
    participatoryBudgetingContract = new web3.eth.Contract(ParticipatoryBudgetingABI, participatoryBudgetingAddress);
  }
  return participatoryBudgetingContract;
};

export const getRewardTokenContract = () => { // Function to get the RewardToken contract instance
  if (!rewardTokenContract) {
    const web3 = new Web3(window.ethereum);
    rewardTokenContract = new web3.eth.Contract(RewardTokenABI, rewardTokenAddress);
  }
  return rewardTokenContract;
};
