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
  "0x9da24c77C9C2988338ab38Ae14376b6AD868601C"
);

export default nftContract;
