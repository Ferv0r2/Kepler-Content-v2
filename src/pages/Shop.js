import React, { Component, useEffect, useState } from "react";
import fetch from "node-fetch";
import caver from "klaytn/caver";
import nftContract from "klaytn/nftContract";
import itemContract from "klaytn/itemContract";
import shopContract from "klaytn/shopContract";
import keyContract from "klaytn/keyContract";

import ShopSlider from "components/ShopSlider";
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
  const [level, setLevel] = useState(0);
  const [tokenURI, setTokenURI] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setBg("bg-black");
    setLoading(false);
  }, []);

  useEffect(() => {
    getBalance();
  });

  const getBalance = async () => {
    const balanceNFT = await nftContract.methods.balanceOf(account).call();
    const balanceStone = await itemContract.methods
      .balanceOf(account, 35)
      .call();

    setNFT(balanceNFT);
    setStone(balanceStone);
  };

  const sendTx = async () => {
    if (balance < 2) {
      alert("2 Klay 이상 소유해야 합니다 :)");
      return;
    }

    await shopContract.methods
      .useStone(account, level)
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

  const sendTxNFT = async (lv) => {
    const tokenArray = [];
    if (lv === 0) {
      tokenArray.push(tokenId1);
    } else if (lv === 1) {
      tokenArray.push(tokenId1);
      tokenArray.push(tokenId2);
    } else if (lv === 2) {
      tokenArray.push(tokenId1);
      tokenArray.push(tokenId2);
      tokenArray.push(tokenId3);
    } else {
      console.log("error");
    }

    await shopContract.methods
      .useNFT(tokenArray, lv + 1)
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
      })
      .on("error", (error) => {
        console.log("error", error);
        alert("교환이 취소되었습니다.");
      });
  };

  const setURI = async (array) => {
    const promises = [];
    const urls = [];

    const len = array.length;
    for (let id = 0; id < len; id++) {
      const promise = async (index) => {
        const res = await fetch(array[index]);
        const posts = await res.json();
        console.log(posts.image);

        urls.push(posts.image);
      };
      promises.push(promise(id));
    }
    await Promise.all(promises);

    setTokenURI(urls);
  };

  const setOpen = async (level) => {
    if (balance < 2) {
      alert("2 Klay 이상 소유해야 합니다 :)");
      return;
    }

    // Get DATE
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();

    console.log(hour, " ", minute);
    if (hour == 20 || hour == 21) {
      if (hour == 20) {
        alert("매일 20:00 ~ 21:30은 상점 점검 시간입니다 (진화 안정)");
        return;
      } else if (hour == 21 && minute <= 30) {
        alert("매일 20:00 ~ 21:30은 상점 점검 시간입니다 (진화 안정)");
        return;
      }
    }

    const addr = account.toUpperCase();
    const ipfs = [];
    if (level === 0) {
      if (tokenId1 == "") {
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
    } else if (level === 1) {
      if (tokenId1 === "" || tokenId2 === "") {
        alert("NFT 값을 입력해주세요 :)");
        return;
      }

      let own = await nftContract.methods.ownerOf(tokenId1).call();

      if (addr != own.toUpperCase()) {
        alert(`${tokenId1}번 NFT의 소유주가 아닙니다.`);
        setTokenId1("");
        setTokenId2("");
        return;
      }

      own = await nftContract.methods.ownerOf(tokenId2).call();

      if (addr != own.toUpperCase()) {
        alert(`${tokenId2}번 NFT의 소유주가 아닙니다.`);
        setTokenId1("");
        setTokenId2("");
        return;
      }

      let url = await nftContract.methods.tokenURI(tokenId1).call();
      ipfs.push(url);

      url = await nftContract.methods.tokenURI(tokenId2).call();
      ipfs.push(url);
    } else if (level === 2) {
      if (tokenId1 === "" || tokenId2 === "" || tokenId3 === "") {
        alert("NFT 값을 입력해주세요 :)");
        return;
      }

      let own = await nftContract.methods.ownerOf(tokenId1).call();

      if (addr != own.toUpperCase()) {
        alert(`${tokenId1}번 NFT의 소유주가 아닙니다.`);
        setTokenId1("");
        setTokenId2("");
        setTokenId3("");
        return;
      }

      own = await nftContract.methods.ownerOf(tokenId2).call();

      if (addr != own.toUpperCase()) {
        alert(`${tokenId2}번 NFT의 소유주가 아닙니다.`);
        setTokenId1("");
        setTokenId2("");
        setTokenId3("");
        return;
      }

      own = await nftContract.methods.ownerOf(tokenId3).call();

      if (addr != own.toUpperCase()) {
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

    setLevel(level);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const prevSlide = () => {
    const { currentIdx } = this.state;
    if (currentIdx !== 0) {
      setIndex(currentIdx - 1);
    }
  };

  const nextSlide = () => {
    const slideCount = 3;
    if (currentIdx !== slideCount - 1) {
      setIndex(currentIdx + 1);
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
    <div className="min-h-screen max-w-4xl m-auto text-white">
      <img src="images/shop/goldot_shop_logo.png" />
      <p>골닷 상점에 오신 걸 환영합니다</p>
      <img src="images/shop/goldot_shop_banner.png" />
      <div className="KeplerShopPage__contents">
        <div className="KeplerShopPage__table">
          <div className="table_title">
            <img src="images/shop/box_title.png" />
          </div>

          {currentIdx == 0 ? (
            <ShopPickaxe count={stone} sendTx={(e) => sendTx(level)} />
          ) : null}
          {currentIdx == 1 ? (
            <ShopKey
              count={nft}
              input1={onInputtokenId1}
              input2={onInputtokenId2}
              input3={onInputtokenId3}
              num1={tokenId1}
              num2={tokenId3}
              num3={tokenId3}
              setOpen={(e) => setOpen(level)}
            />
          ) : null}
          {currentIdx == 2 ? (
            <ShopPotion
              prev={prevPotionSlide}
              next={nextPotionSlide}
              currentPotionIdx={currentPotionIdx}
              sendTxUp={(e) => sendTxUp(level)}
              sendTxMix={(e) => sendTxMix(level)}
            />
          ) : null}

          <Modal
            open={modal}
            tokenId1={tokenId1}
            tokenId2={tokenId2}
            tokenId3={tokenId3}
            urls={tokenURI}
            tx={(e) => sendTxNFT(level)}
            close={closeModal}
          />
        </div>

        <div className="table_changer">
          <span className="prev" onClick={prevSlide}>
            <img src="images/shop/prev.png" />
          </span>
          <p>{sell_item[currentIdx]}</p>
          <span className="next" onClick={nextSlide}>
            <img src="images/shop/next.png" />
          </span>
        </div>

        <p>2 Klay 이상 소유해야 트랜잭션이 에러를 발생시키지 않습니다</p>
        <p>매일 20:30 ~ 21:30은 열쇠 거래가 제한됩니다</p>
      </div>
    </div>
  );
};

export default Shop;
