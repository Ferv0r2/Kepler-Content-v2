import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import govContract from "klaytn/govContract";
import Loading from "components/Loading";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { bgState, accountState, proposalState } from "components/states";

const baseUri = "https://governance.api.kepler-452b.net/governance/";
const Governance = () => {
  const setBg = useSetRecoilState(bgState);
  const account = useRecoilValue(accountState);
  const [proposalArray, setProposals] = useRecoilState(proposalState);
  const [section, setSection] = useState(0);
  const [status, setStatus] = useState(0);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setBg("bg-govBg");
    getProposal();
  }, []);

  useEffect(() => {
    if (isLoading) getProposal();
  });

  const setStats = async (array) => {
    const resultStatus = [];

    const len = array.length;
    for (let id = 0; id < len; id++) {
      if (array[id] == 0) {
        resultStatus.push("0");
        continue;
      }

      const response = await fetch(baseUri + (len - 1 - id)).then((res) =>
        res.json()
      );
      if (response.voteAgree > response.voteDegree) {
        resultStatus.push("3");
      } else if (response.voteAgree < response.voteDegree) {
        resultStatus.push("4");
      } else if (response.voteAgree == response.voteDegree) {
        resultStatus.push("5");
      }
    }

    setStatus(resultStatus);
  };

  const getProposal = async () => {
    const { klaytn } = window;
    if (klaytn === undefined) return;
    if (account === "") return;

    const proposals = [];
    const status = [];
    const proposalCount = await govContract.methods.proposalCount().call();

    const promises = [];
    for (let i = 0; i < proposalCount; i++) {
      const promise = async (index) => {
        const proposal = await govContract.methods.proposals(index).call();
        proposals.push(proposal);

        const stat = await govContract.methods.status(index).call();
        status.push(stat);
      };
      promises.push(promise(i));
    }
    await Promise.all(promises);

    proposals.sort((a, b) => {
      if (parseInt(a.id) > parseInt(b.id)) {
        return -1;
      } else if (parseInt(a.id) < parseInt(b.id)) {
        return 1;
      } else {
        return 0;
      }
    });

    status.sort();
    await setStats(status);

    setProposals(proposals);
    setLoading(false);
  };

  const setSectionPrev = async () => {
    if (section === 0) {
      alert("첫번째 페이지입니다.");
      return;
    }
    setSection(section - 1);
  };

  const setSectionNext = async () => {
    if (proposalArray.length - section * 5 <= 5) {
      alert("마지막 페이지입니다.");
      return;
    }
    setSection(section + 1);
  };

  if (isLoading) return <Loading />;

  const result = ["투표중", "투표 완료", "투표 취소", "찬성", "반대", "보류"];
  let ids;
  let titles;
  let stats;
  console.log(account);
  if (account !== "") {
    ids = proposalArray?.slice(section * 5, section * 5 + 5).map((id) => (
      <li key={id.id}>
        <Link to={`/governance/${parseInt(id.id) + 1}`}>
          {parseInt(id.id) + 1}
        </Link>
      </li>
    ));

    titles = proposalArray?.slice(section * 5, section * 5 + 5).map((id) => (
      <li key={id.id}>
        <Link to={`/governance/${parseInt(id.id) + 1}`}>
          <p className="truncate">{id.title}</p>
        </Link>
      </li>
    ));

    stats = status
      .slice(section * 5, section * 5 + 5)
      .map((stat, index) => <li key={index}>{result[stat]}</li>);
  }

  return (
    <div className="max-w-4xl m-auto min-h-screen text-white text-center font-GmarketSansMedium">
      <div className="relative">
        <img
          className="w-11/12 sm:w-10/12 m-auto"
          src="images/governance/gove_icon.png"
        />
        <div className="absolute italic text-shadow-purple text-center font-bold transform top-16 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <p className="text-3xl py-3">Kepler-452b</p>
          <p className="text-4xl py-3">GOVERNANCE</p>
        </div>
      </div>
      <div className="pb-12 italic">
        <Link to="/proposal">
          <div className="w-1/4 m-auto rounded-3xl -mt-6 p-3 text-xl font-GmarketSansBold cursor-pointer bg-govBtn">
            제안 작성하기
          </div>
        </Link>
      </div>
      <div className="KeplerGovernancePage__main">
        <div className="italic">
          <p>
            케플러 식물 NFT를 소유중이라면 투표를 진행하고 제안을 작성할 수
            있습니다.
          </p>
          <p className="py-2">
            더 나은 Kepler-452b 프로젝트를 위해 여러분의 의견을 보여주세요
          </p>
        </div>
        <div className="py-12 text-lg italic">
          <div className="text-2xl font-bold">LIST</div>
          <div className="py-6">
            <div className="flex w-9/12 m-auto bg-govBtn p-6 rounded-2xl items-center justify-center text-center">
              <div className="w-1/12 m-auto">
                <ul>{ids}</ul>
              </div>
              <div className="w-9/12 m-auto border-r-2">
                <ul className="w-11/12 m-auto">{titles}</ul>
              </div>
              <div className="w-2/12 m-auto">
                <ul>{stats}</ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-2/3 sm:w-1/3 py-8 m-auto items-center">
          <span className="w-1/4 cursor-pointer" onClick={setSectionPrev}>
            <img
              className="w-1/2 rounded-md p-1 m-auto"
              src="images/governance/prev.png"
            />
          </span>
          <p className="w-1/2 text-xl">{section + 1}</p>
          <span className="w-1/4 cursor-pointer" onClick={setSectionNext}>
            <img
              className="w-1/2 rounded-md p-1 m-auto"
              src="images/governance/next.png"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Governance;
