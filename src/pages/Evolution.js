import React, { useState, useEffect } from "react";
import nftContract from "klaytn/nftContract";
import EvolTableOfNum from "components/EvolTableOfNum";
import EvolTable from "components/EvolTable";
import Loading from "components/Loading";

import mix from "data/mix.json";

import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
  accountState,
  bgState,
  evoledState,
  evolState,
  mixEvolState,
  mixTotalState,
  spawnedState,
} from "components/states";
const Evolution = () => {
  const setBg = useSetRecoilState(bgState);
  const account = useRecoilValue(accountState);
  const [evol, setEvol] = useRecoilState(evolState);
  const [evoled, setEvoled] = useRecoilState(evoledState);
  const [spawned, setSpawned] = useRecoilState(spawnedState);
  const [mixTotal, setMixTotal] = useRecoilState(mixTotalState);
  const [mixEvol, setMixEvol] = useRecoilState(mixEvolState);
  const [isLoading, setLoading] = useState(true);
  const [isSubLoading, setSubLoading] = useState(true);

  useEffect(() => {
    setBg("bg-black");
    setTotal();
    setOwner();
  }, []);

  // useEffect(() => {
  //   setTimeout(async () => {
  //     if (isSubLoading === false) return;
  //     setOwner();
  //   }, 3000);
  // });

  const setTotal = async () => {
    const baseURI = "https://api.kepler-452b.net/evol/";

    // GET DAILY EVOL
    const date = new Date();
    const dateY = new Date(Date.now() - 86400000);

    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    const monthY = ("0" + (dateY.getMonth() + 1)).slice(-2);
    const dayY = ("0" + dateY.getDate()).slice(-2);

    const today = `${year}-${month}-${day}`;
    const yesterday = `${year}-${monthY}-${dayY}`;

    let resultEvol;
    try {
      const evolURI = baseURI + `${today}-daily`;
      resultEvol = await fetch(evolURI).then((res) => res.json());
    } catch {
      const evolURI = baseURI + `${yesterday}-daily`;
      resultEvol = await fetch(evolURI).then((res) => res.json());
    }

    setEvol(resultEvol);
    setLoading(false);
  };

  const setOwner = async () => {
    const { klaytn } = window;
    if (klaytn === undefined) return;
    if (account === "") return;
    if (isLoading) return;

    const len = await nftContract.methods.balanceOf(account).call();

    const promises = [];

    let evoledMap = new Map();
    let spawnedMap = new Map();
    let mixTotalMap = new Map();
    let mixEvolMap = new Map();

    for (let id = 0; id < len; id++) {
      const promise = async (index) => {
        const tokenId = await nftContract.methods
          .tokenOfOwnerByIndex(account, index)
          .call()
          .then((res) => parseInt(res));

        if (evol["token"].includes(tokenId)) {
          const url = await nftContract.methods.tokenURI(tokenId).call();
          const response = await fetch(url).then((res) => res.json());

          evoled.set(tokenId, response.image);
        }

        if (evol["spawning"].includes(tokenId)) {
          const url = await nftContract.methods.tokenURI(tokenId).call();
          const response = await fetch(url).then((res) => res.json());

          spawned.set(tokenId, response.image);
        }

        if (mix["mix"].includes(tokenId) || mix["hmix"].includes(tokenId)) {
          const url = await nftContract.methods.tokenURI(tokenId).call();
          const response = await fetch(url).then((res) => res.json());

          mixTotal.set(tokenId, response.image);

          if (evol["token"].includes(tokenId)) {
            const url = await nftContract.methods.tokenURI(tokenId).call();
            const response = await fetch(url).then((res) => res.json());

            mixEvol.set(tokenId, response.image);
          }
        }
      };

      promises.push(promise(id));
    }

    await Promise.all(promises);

    const evoledASC = new Map([...evoledMap.entries()].sort((a, b) => a - b));
    const spawnedASC = new Map([...spawnedMap.entries()].sort((a, b) => a - b));
    const mixTotalASC = new Map(
      [...mixTotalMap.entries()].sort((a, b) => a - b)
    );
    const mixEvolASC = new Map([...mixEvolMap.entries()].sort((a, b) => a - b));

    console.log(evoledASC);
    setEvoled(evoledASC);
    setSpawned(spawnedASC);
    setMixTotal(mixTotalASC);
    setMixEvol(mixEvolASC);

    setSubLoading(false);
  };

  if (isLoading) return <Loading />;
  return (
    <div className="max-w-4xl m-auto min-h-screen text-white text-center font-GmarketSansMedium">
      <EvolTableOfNum date={evol.date} tokenData={evol.token} />
      {/* {isSubLoading ? (
        <p>Loading ...</p>
      ) : (
        <EvolTable
          date={evol.date}
          name="Today's Evolution"
          info="전체 진화 데이터를 불러오고 있습니다 :)"
          tokenData={evoled}
        />
      )} */}
    </div>
  );
};

export default Evolution;
