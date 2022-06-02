import caver from "klaytn/caver";
import ABI from "abi/govABI.json";

/**
 * 1. Create contract instance
 * ex:) new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
 * You can call contract method through this instance.
 * Now you can access the instance by `this.countContract` variable.
 */

const govContract = new caver.klay.Contract(
  ABI,
  "0x71296B11a5E298d65B6cA395c469e7b5A908B5c4"
);

export default govContract;
