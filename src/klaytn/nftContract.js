import caver from "klaytn/caver";
import ABI from "abi/nftABI.json";

/**
 * 1. Create contract instance
 * ex:) new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
 * You can call contract method through this instance.
 * Now you can access the instance by `this.countContract` variable.
 */

const nftContract = new caver.klay.Contract(
  ABI,
  "0x928267E7dB3d173898553Ff593A78719Bb16929F"
);

export default nftContract;
