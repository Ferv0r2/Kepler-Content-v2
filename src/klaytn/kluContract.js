import caver from "klaytn/caver";
import ABI from "abi/kluABI.json";

/**
 * 1. Create contract instance
 * ex:) new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
 * You can call contract method through this instance.
 * Now you can access the instance by `this.countContract` variable.
 */

const nftContract = new caver.klay.Contract(
  ABI,
  "0x75dcAA3eb2403c7725Cc8e5E38f6949eBaB28aCC"
);

export default nftContract;
