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
  "0xf5996a159872e016472756a7723915EEdC357f58"
);

export default nftContract;
