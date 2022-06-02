import caver from "klaytn/caver";
import ABI from "abi/itemABI.json";

/**
 * 1. Create contract instance
 * ex:) new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
 * You can call contract method through this instance.
 * Now you can access the instance by `this.countContract` variable.
 */

const itemContract = new caver.klay.Contract(
  ABI,
  "0x31756CAa3363516C01843F96f6AA7d9c922163b3"
);

export default itemContract;
