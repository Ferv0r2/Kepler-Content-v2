import React, { useState, useEffect } from "react";
import itemContract from "klaytn/itemContract";
import miningContract from "klaytn/miningContract";
import MiningSlider from "components/MiningSlider";
import Modal from "components/MiningModal";
import Loading from "components/Loading";

import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  bgState,
  accountState,
  balanceState,
  pickIdState,
} from "components/states";

const Mining = () => {
  const setBg = useSetRecoilState(bgState);
  const account = useRecoilValue(accountState);
  const balance = useRecoilValue(balanceState);
  const pickId = useRecoilValue(pickIdState);
  const [isLoading, setLoading] = useState(true);
  const [pick, setPick] = useState(0);
  const [stone, setStone] = useState(35);
  const [isCount, setCount] = useState(0);
  const [isBreak, setBreak] = useState(1);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setBg("bg-miningBg");
    getPick();
    setLoading(false);
  }, []);

  useEffect(() => {
    getPick();
  });

  const getPick = async () => {
    const { klaytn } = window;
    if (klaytn === undefined) return;
    if (account === "") return;

    const pickaxe = await itemContract.methods
      .balanceOf(account, 36 + pickId)
      .call();

    setPick(pickaxe);
  };

  const gachaId = async () => {
    let pointer = 35;
    let counter = 0;
    let status = 1;

    const destruct = Math.random() * 100; // 0 ~ 99 실수

    const itemGacha = Math.random() * 100; // 0 ~ 99 실수
    const itemNum = Math.floor(Math.random() * 5) + 30; // 0 ~ 4

    if (pickId == 2) {
      if (destruct < 40) {
        status = 0;
      }
      if (itemGacha < 0.8) {
        pointer = itemNum;
        counter = 3;
      } else if (itemGacha < 10.4) {
        pointer = itemNum;
        counter = 2;
      } else if (itemGacha < 48.8) {
        pointer = itemNum;
        counter = 1;
      }
    } else if (pickId == 1) {
      if (destruct < 55) {
        status = 0;
      }
      if (itemGacha < 4) {
        pointer = itemNum;
        counter = 2;
      } else if (itemGacha < 32) {
        pointer = itemNum;
        counter = 1;
      }
    } else if (pickId == 0) {
      if (destruct < 70) {
        status = 0;
      }
      if (itemGacha < 20) {
        pointer = itemNum;
        counter = 1;
      }
    } else {
      console.log("error");
    }

    setStone(pointer);
    setCount(counter);
    setBreak(status);
  };

  const sendTxUse = async () => {
    await gachaId();

    await miningContract.methods
      .usePickaxe(account, pickId, stone, isCount)
      .send({
        from: account,
        gas: 2500000,
      })
      .on("transactionHash", (transactionHash) => {
        console.log("txHash", transactionHash);
      })
      .on("receipt", (receipt) => {
        console.log("receipt", receipt);
      })
      .on("error", (error) => {
        console.log("error", error);
        alert("믹스스톤 채굴이 취소되었습니다.");
      });
  };

  // const sendTxItem = async () => {
  //   if (balance < 2) {
  //     alert("2 Klay 이상 소유해야 합니다 :)");
  //     return;
  //   }

  //   if (pick == 0) {
  //     alert("곡괭이가 없습니다.");
  //     return;
  //   }

  //   const payer = await miningContract.methods.payers(pickId, account).call();

  //   if (!payer) await sendTxUse();

  //   const gacha = await miningContract.methods.gachas(pickId, account).call();

  //   await miningContract.methods
  //     .mining(pickId, isBreak)
  //     .send({
  //       from: account,
  //       gas: 2500000,
  //     })
  //     .on("transactionHash", (transactionHash) => {
  //       console.log("txHash", transactionHash);
  //     })
  //     .on("receipt", (receipt) => {
  //       console.log("receipt", receipt);
  //       setStone(gacha[0]);
  //       setCount(gacha[1]);
  //       setModal(true);
  //     })
  //     .on("error", (error) => {
  //       console.log("error", error);
  //       alert("믹스스톤 채굴이 취소되었습니다.");
  //     });
  // };

  const sendTxItem = async () => {
    setStone(32);
    setCount(1);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-4xl m-auto min-h-screen text-white text-center font-GmarketSansMedium">
      <img className="w-10/12 m-auto" src="images/mining/mining_banner.png" />
      <img className="w-8/12 -mt-5 m-auto" src="video/mining.png" />

      <Modal open={modal} pickId={pickId} stone={stone} close={closeModal} />
      <div className="py-8 w-40 m-auto">
        <div
          className="rounded-2xl py-3 text-lg font-GmarketSansBold cursor-pointer  bg-miningBtnBg hover:bg-miningBtnHover"
          onClick={sendTxItem}
        >
          START
        </div>
      </div>
      <p className="py-6">
        아래에 가지고 있는 곡괭이를 선택 후 "START" 버튼을 눌러 믹스스톤을
        채굴해주세요
      </p>
      <div className="pb-16">
        <MiningSlider />
        <p className="py-5">남은 수량 : {pick}개</p>
      </div>
    </div>
  );
};

export default Mining;
