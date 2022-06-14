import React, { useEffect, useState } from "react";
import fetch from "node-fetch";
import nftContract from "klaytn/nftContract";
import itemContract from "klaytn/itemContract";
import shopContract from "klaytn/shopContract";
import keyContract from "klaytn/keyContract";

import Modal from "components/ShopModal";
import Loading from "components/Loading";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import ShopPickaxe from "components/ShopPickaxe";
import ShopKey from "components/ShopKey";
import ShopPotion from "components/ShopPotion";
import {
  bgState,
  accountState,
  balanceState,
  shopIdState,
  shopPotionIdState,
} from "components/states";

const Shop = () => {
  const setBg = useSetRecoilState(bgState);
  const account = useRecoilValue(accountState);
  const balance = useRecoilValue(balanceState);
  const [currentIdx, setIndex] = useRecoilState(shopIdState);
  const [currentPotionIdx, setPotionIndex] = useRecoilState(shopPotionIdState);
  const [isLoading, setLoading] = useState(true);
  const [stone, setStone] = useState(0);
  const [nft, setNFT] = useState(0);
  const [tokenId1, setTokenId1] = useState("");
  const [tokenId2, setTokenId2] = useState("");
  const [tokenId3, setTokenId3] = useState("");
  const [tokenURI, setTokenURI] = useState([]);
  const [level, setLevel] = useState(0);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setBg("bg-black");
  }, []);

  useEffect(() => {
    if (isLoading) getBalance();
  });

  const getBalance = async () => {
    const balanceNFT = await nftContract.methods.balanceOf(account).call();
    const balanceStone = await itemContract.methods
      .balanceOf(account, 35)
      .call();

    setNFT(balanceNFT);
    setStone(balanceStone);

    setLoading(false);
  };

  const sendTx = async (lv) => {
    if (balance < 2) {
      alert("2 Klay 이상 소유해야 합니다 :)");
      return;
    }

    await shopContract.methods
      .useStone(account, lv)
      .send({
        from: account,
        gas: 2500000,
      })
      .on("transactionHash", (transactionHash) => {
        console.log("txHash", transactionHash);
      })
      .on("receipt", (receipt) => {
        console.log("receipt", receipt);
        alert("스톤 거래 완료!");
      })
      .on("error", (error) => {
        console.log("error", error);
        alert("교환이 취소되었습니다.");
      });
  };

  const sendTxUp = async (lv) => {
    if (balance < 2) {
      alert("2 Klay 이상 소유해야 합니다 :)");
      return;
    }

    await shopContract.methods
      .upPotion(account, currentPotionIdx + lv)
      .send({
        from: account,
        gas: 2500000,
      })
      .on("transactionHash", (transactionHash) => {
        console.log("txHash", transactionHash);
      })
      .on("receipt", (receipt) => {
        console.log("receipt", receipt);
        alert("포션 업그레이드 완료!");
      })
      .on("error", (error) => {
        console.log("error", error);
        alert("교환이 취소되었습니다.");
      });
  };

  const sendTxMix = async (lv) => {
    if (balance < 2) {
      alert("2 Klay 이상 소유해야 합니다 :)");
      return;
    }

    await shopContract.methods
      .mixPotion(account, currentPotionIdx + lv)
      .send({
        from: account,
        gas: 2500000,
      })
      .on("transactionHash", (transactionHash) => {
        console.log("txHash", transactionHash);
      })
      .on("receipt", (receipt) => {
        console.log("receipt", receipt);
        alert("포션 믹스 완료!");
      })
      .on("error", (error) => {
        console.log("error", error);
        alert("교환이 취소되었습니다.");
      });
  };

  const sendTxNFT = async () => {
    const tokenArray = [];
    if (level === 0) {
      tokenArray.push(tokenId1);
    } else if (level === 1) {
      tokenArray.push(tokenId1);
      tokenArray.push(tokenId2);
    } else if (level === 2) {
      tokenArray.push(tokenId1);
      tokenArray.push(tokenId2);
      tokenArray.push(tokenId3);
    } else {
      console.log("error");
    }

    await keyContract.methods
      .useNFT(tokenArray, level + 1)
      .send({
        from: account,
        gas: 2500000,
      })
      .on("transactionHash", (transactionHash) => {
        console.log("txHash", transactionHash);
      })
      .on("receipt", (receipt) => {
        console.log("receipt", receipt);
        alert("열쇠 거래 완료!");

        setTokenId1("");
        setTokenId2("");
        setTokenId3("");
        setModal(false);
      })
      .on("error", (error) => {
        console.log("error", error);
        alert("교환이 취소되었습니다.");

        setTokenId1("");
        setTokenId2("");
        setTokenId3("");
        setModal(false);
      });
  };

  const setURI = async (array) => {
    const promises = [];
    const urls = [];

    const len = array.length;
    for (let id = 0; id < len; id++) {
      const promise = async (index) => {
        const response = await fetch(array[index]).then((res) => res.json());

        urls.push(response.image);
      };
      promises.push(promise(id));
    }
    await Promise.all(promises);

    setTokenURI(urls);
  };

  const setOpen = async (lv) => {
    if (balance < 2) {
      alert("2 Klay 이상 소유해야 합니다 :)");
      return;
    }

    // Get DATE
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();

    if (hour === 20 || hour === 21) {
      if (hour === 20) {
        alert("매일 20:00 ~ 21:30은 상점 점검 시간입니다 (진화 안정)");
        return;
      } else if (hour === 21 && minute <= 30) {
        alert("매일 20:00 ~ 21:30은 상점 점검 시간입니다 (진화 안정)");
        return;
      }
    }

    const addr = account.toUpperCase();
    const ipfs = [];
    if (lv === 0) {
      if (tokenId1 === "") {
        alert("NFT 값을 입력해주세요 :)");
        return;
      }
      let own = await nftContract.methods.ownerOf(tokenId1).call();

      if (addr !== own.toUpperCase()) {
        alert(`${tokenId1}번 NFT의 소유주가 아닙니다.`);
        setTokenId1("");
        return;
      }

      let url = await nftContract.methods.tokenURI(tokenId1).call();
      ipfs.push(url);
    } else if (lv === 1) {
      if (tokenId1 === "" || tokenId2 === "") {
        alert("NFT 값을 입력해주세요 :)");
        return;
      }

      let own = await nftContract.methods.ownerOf(tokenId1).call();

      if (addr !== own.toUpperCase()) {
        alert(`${tokenId1}번 NFT의 소유주가 아닙니다.`);
        setTokenId1("");
        setTokenId2("");
        return;
      }

      own = await nftContract.methods.ownerOf(tokenId2).call();

      if (addr !== own.toUpperCase()) {
        alert(`${tokenId2}번 NFT의 소유주가 아닙니다.`);
        setTokenId1("");
        setTokenId2("");
        return;
      }

      let url = await nftContract.methods.tokenURI(tokenId1).call();
      ipfs.push(url);

      url = await nftContract.methods.tokenURI(tokenId2).call();
      ipfs.push(url);
    } else if (lv === 2) {
      if (tokenId1 === "" || tokenId2 === "" || tokenId3 === "") {
        alert("NFT 값을 입력해주세요 :)");
        return;
      }

      let own = await nftContract.methods.ownerOf(tokenId1).call();

      if (addr !== own.toUpperCase()) {
        alert(`${tokenId1}번 NFT의 소유주가 아닙니다.`);
        setTokenId1("");
        setTokenId2("");
        setTokenId3("");
        return;
      }

      own = await nftContract.methods.ownerOf(tokenId2).call();

      if (addr !== own.toUpperCase()) {
        alert(`${tokenId2}번 NFT의 소유주가 아닙니다.`);
        setTokenId1("");
        setTokenId2("");
        setTokenId3("");
        return;
      }

      own = await nftContract.methods.ownerOf(tokenId3).call();

      if (addr !== own.toUpperCase()) {
        alert(`${tokenId3}번 NFT의 소유주가 아닙니다.`);
        setTokenId1("");
        setTokenId2("");
        setTokenId3("");
        return;
      }

      let url = await nftContract.methods.tokenURI(tokenId1).call();
      ipfs.push(url);

      url = await nftContract.methods.tokenURI(tokenId2).call();
      ipfs.push(url);

      url = await nftContract.methods.tokenURI(tokenId3).call();
      ipfs.push(url);
    }

    await setURI(ipfs);

    setLevel(lv);
    setModal(true);
  };

  const closeModal = () => {
    setTokenId1("");
    setTokenId2("");
    setTokenId3("");
    setModal(false);
  };

  const prevSlide = () => {
    if (currentIdx !== 0) {
      setIndex(currentIdx - 1);
    } else {
      alert("첫 페이지 입니다.");
    }
  };

  const nextSlide = () => {
    const slideCount = 3;
    if (currentIdx !== slideCount - 1) {
      setIndex(currentIdx + 1);
    } else {
      alert("마지막 페이지 입니다.");
    }
  };

  const prevPotionSlide = () => {
    if (currentPotionIdx !== 0) {
      setPotionIndex(currentPotionIdx - 1);
    }
  };

  const nextPotionSlide = () => {
    const slideCount = 5;
    if (currentPotionIdx !== slideCount - 1) {
      setPotionIndex(currentPotionIdx + 1);
    }
  };

  const onInputtokenId1 = async (e) => {
    setTokenId1(e.target.value);
  };

  const onInputtokenId2 = async (e) => {
    setTokenId2(e.target.value);
  };

  const onInputtokenId3 = async (e) => {
    setTokenId3(e.target.value);
  };

  const sell_item = ["곡괭이 교환", "열쇠 교환", "포션 교환"];
  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen max-w-2xl m-auto text-white font-GmarketSansMedium">
      <img
        className="w-11/12 sm:w-full m-auto"
        src="images/shop/goldot_shop_logo.png"
      />
      <p className="text-center text-xl sm:text-2xl pt-4 pb-12">
        골닷 상점에 오신 걸 환영합니다
      </p>
      <img
        className="w-10/12 sm:w-full m-auto"
        src="images/shop/goldot_shop_banner.png"
      />
      <div className="w-10/12 sm:w-full m-auto border-2 shadow-custom">
        <div className="relative w-full sm:w-8/12 m-auto">
          <img
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            src="images/shop/box_title.png"
          />
        </div>

        {currentIdx == 0 ? (
          <div className="py-16 text-center">
            <ShopPickaxe id={0} sendTx={(e) => sendTx(0)} />
            <ShopPickaxe id={1} sendTx={(e) => sendTx(1)} />
            <ShopPickaxe id={2} sendTx={(e) => sendTx(2)} />
            <div className="block sm:flex w-2/3 sm:w-1/2 m-auto text-center items-center pt-8">
              <p className="w-full sm:w-9/12 pb-8 sm:pb-0 m-auto text-lg sm:text-2xl">
                남은 빛바랜 스톤 갯수
              </p>
              <p className="w-full sm:w-3/12 m-auto text-4xl">{stone}</p>
            </div>
          </div>
        ) : null}
        {currentIdx == 1 ? (
          <div className="py-16 text-center">
            <ShopKey
              id={0}
              input1={onInputtokenId1}
              input2={onInputtokenId2}
              input3={onInputtokenId3}
              num1={tokenId1}
              num2={tokenId2}
              num3={tokenId3}
              setOpen={(e) => setOpen(0)}
            />
            <ShopKey
              id={1}
              input1={onInputtokenId1}
              input2={onInputtokenId2}
              input3={onInputtokenId3}
              num1={tokenId1}
              num2={tokenId2}
              num3={tokenId3}
              setOpen={(e) => setOpen(1)}
            />
            <ShopKey
              id={2}
              input1={onInputtokenId1}
              input2={onInputtokenId2}
              input3={onInputtokenId3}
              num1={tokenId1}
              num2={tokenId2}
              num3={tokenId3}
              setOpen={(e) => setOpen(2)}
            />
            <div className="block sm:flex w-1/2 m-auto text-center items-center pt-8">
              <p className="w-full sm:w-7/12 m-auto pb-6 sm:pb-0 text-lg sm:text-2xl">
                남은 NFT 갯수
              </p>
              <p className="w-full sm:w-5/12 m-auto text-2xl sm:text-4xl">
                {nft}
              </p>
            </div>
          </div>
        ) : null}
        {currentIdx == 2 ? (
          <div className="relative py-16 text-center">
            <div className="w-10/12 sm:w-5/12 m-auto bg-shopItem p-4 items-center rounded-lg z-3">
              <p className="pb-3">현재 보고 있는 종</p>
              <div className="flex w-1/2 sm:w-1/3 m-auto items-center">
                <span className="w-3/12" onClick={prevPotionSlide}>
                  <img
                    className="p-0.5 border-2 border-shopItem cursor-pointer rounded-lg hover:border-white"
                    src="images/shop/prev.png"
                  />
                </span>
                <p className="w-6/12">{currentPotionIdx + 1} 종</p>
                <span className="w-3/12" onClick={nextPotionSlide}>
                  <img
                    className="p-0.5 border-2 border-shopItem cursor-pointer rounded-lg hover:border-white"
                    src="images/shop/next.png"
                  />
                </span>
              </div>
            </div>
            <ShopPotion
              id={0}
              currentPotionIdx={currentPotionIdx}
              sendTxUp={(e) => sendTxUp(20)}
            />
            <ShopPotion
              id={1}
              currentPotionIdx={currentPotionIdx}
              sendTxUp={(e) => sendTxUp(10)}
            />
            <ShopPotion
              id={0}
              currentPotionIdx={currentPotionIdx}
              sendTxMix={(e) => sendTxMix(20)}
            />
            <ShopPotion
              id={1}
              currentPotionIdx={currentPotionIdx}
              sendTxMix={(e) => sendTxMix(10)}
            />
            <ShopPotion
              id={2}
              currentPotionIdx={currentPotionIdx}
              sendTxMix={(e) => sendTxMix(0)}
            />
          </div>
        ) : null}

        <Modal
          open={modal}
          tokenId1={tokenId1}
          tokenId2={tokenId2}
          tokenId3={tokenId3}
          urls={tokenURI}
          tx={sendTxNFT}
          close={closeModal}
        />
      </div>

      <div className="flex w-2/3 sm:w-1/3 py-8 m-auto items-center">
        <span className="w-1/4 cursor-pointer" onClick={prevSlide}>
          <img
            className="w-1/2 bg-shopItem rounded-md p-1 m-auto border-2 border-shopItem hover:border-white"
            src="images/shop/prev.png"
          />
        </span>
        <p className="w-1/2 text-xl text-center">{sell_item[currentIdx]}</p>
        <span className="w-1/4 cursor-pointer" onClick={nextSlide}>
          <img
            className="w-1/2 bg-shopItem rounded-md p-1 m-auto border-2 border-shopItem hover:border-white"
            src="images/shop/next.png"
          />
        </span>
      </div>

      <div className="text-center text-sm sm:text-base py-3">
        <p className="w-10/12 sm:w-full m-auto py-3">
          2 Klay 이상 소유해야 트랜잭션이 에러를 발생시키지 않습니다
        </p>
        <p>매일 20:30 ~ 21:30은 열쇠 거래가 제한됩니다</p>
      </div>
    </div>
  );
};

export default Shop;
