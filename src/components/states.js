import { atom } from "recoil";

const bgState = atom({
  key: "bgState",
  default: "bg-main",
});

const scrollState = atom({
  key: "scrollState",
  default: "",
});

const scrollBtnState = atom({
  key: "scrollBtnState",
  default: 0,
});

const accountState = atom({
  key: "addressState",
  default: "",
});

const balanceState = atom({
  key: "balanceState",
  default: 0,
});

const networkState = atom({
  key: "networkState",
  default: "",
});

const evolState = atom({
  key: "evolState",
  default: 0,
});

const evoledState = atom({
  key: "evoledState",
  default: {},
});

const spawnedState = atom({
  key: "spawnedState",
  default: {},
});

const mixTotalState = atom({
  key: "mixTotalState",
  default: {},
});

const mixEvolState = atom({
  key: "mixEvolState",
  default: {},
});

const boxIdState = atom({
  key: "boxIdState",
  default: 0,
});

const pickIdState = atom({
  key: "pickIdState",
  default: 0,
});

const shopIdState = atom({
  key: "shopIdState",
  default: 0,
});

const shopPotionIdState = atom({
  key: "shopPotionIdState",
  default: 0,
});

const proposalState = atom({
  key: "proposalState",
  default: {},
});

export {
  bgState,
  scrollState,
  scrollBtnState,
  accountState,
  balanceState,
  evolState,
  evoledState,
  spawnedState,
  mixTotalState,
  mixEvolState,
  networkState,
  boxIdState,
  pickIdState,
  shopIdState,
  shopPotionIdState,
  proposalState,
};
