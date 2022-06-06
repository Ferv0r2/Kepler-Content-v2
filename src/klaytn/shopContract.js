import caver from "klaytn/caver";
import ABI from "abi/shopABI.json";

/**
 * 1. Create contract instance
 * ex:) new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
 * You can call contract method through this instance.
 * Now you can access the instance by `this.countContract` variable.
 */

const nftContract = new caver.klay.Contract(
  ABI,
  "0xA8B43d92754f42E16012207bc6368Ede70FC4615"
);

export default nftContract;
