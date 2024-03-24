import Web3 from 'web3';
import ParticipatoryBudgetingABI from '../contracts/ParticipatoryBudgetingABI.json';

// const contractAddress = '0xc9CDcE80a136cdAFD65AfFaEE3d408808F00486f';
const contractAddress = '0x50d5837B447c5041b2fC15e2d4A1E70a9E539229';
let participatoryBudgetingContract = null;

export const getContract = () => {
  if (!participatoryBudgetingContract) {
    const web3 = new Web3(window.ethereum);
    participatoryBudgetingContract = new web3.eth.Contract(ParticipatoryBudgetingABI, contractAddress);
  }
  return participatoryBudgetingContract;
};