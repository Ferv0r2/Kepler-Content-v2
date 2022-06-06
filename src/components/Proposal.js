import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import NFTBox from "components/NFTBox";

import caver from "klaytn/caver";
import nftContract from "klaytn/nftContract";
import govContract from "klaytn/govContract";

import { useRecoilState, useRecoilValue } from "recoil";
import { accountState, balanceState } from "components/states";

const baseUri = "https://governance.api.kepler-452b.net/governance/";

const Proposal = () => {
  const account = useRecoilValue(accountState);
  const balance = useRecoilValue(balanceState);
  const [isLoading, setLoading] = useState(true);
  const [status, setStatus] = useState(0);
  const [proposal, setProposal] = useState({});
  const [vote, setVote] = useState("0");
  const [blockNum, setBlockNumber] = useState("0");
  const [times, setTimer] = useState("0");
  const [tkURI, setTokenURIs] = useState([]);
  const params = useParams();
  const proposal_id = parseInt(params.id) - 1;
  // const location = useLocation();
  // const navi = useNavigate();

  useEffect(() => {
    setProposalInfo();
    setAPI();
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      setProposalInfo();
    }, 10000);
  });

  const setProposalInfo = async () => {
    const stat = await govContract.methods.status(proposal_id).call();
    const propose = await govContract.methods.proposals(proposal_id).call();

    const bn = await caver.klay.getBlockNumber();
    let time =
      parseInt(propose.blockNumber) + parseInt(propose.votePeriod) - bn;
    if (time <= 0) time = 0;

    let hour =
      parseInt(time / 3600) < 10
        ? "0" + parseInt(time / 3600)
        : parseInt(time / 3600);
    let min =
      parseInt((time % 3600) / 60) < 10
        ? "0" + parseInt((time % 3600) / 60)
        : parseInt((time % 3600) / 60);
    let sec = time % 60 < 10 ? "0" + (time % 60) : time % 60;

    const result = hour + ":" + min + ":" + sec;

    setStatus(stat);
    setProposal(propose);
    setBlockNumber(time);
    setTimer(result);
  };

  const setAPI = async () => {
    const url = baseUri + `${proposal_id}`;
    const response = await fetch(url).then((res) => res.json());
    console.log(response);
    setVote(response);
  };

  const getTokenIds = async () => {
    await setAPI();
    const voted = vote.totalTokenIds;
    let accountVote;
    try {
      accountVote = vote["addresses"][account]["balance"];
    } catch {
      accountVote = 0;
    }

    const tokenIds = [];
    const expect = [];

    const promises = [];
    for (let id = accountVote; id < accountVote + 100; id++) {
      if (balance - id == 0) {
        console.log("ALL IN");
        break;
      }
      const promise = async (index) => {
        const tokenId = await nftContract.methods
          .tokenOfOwnerByIndex(account, index)
          .call();

        if (voted.includes(tokenId)) {
          expect.push(tokenId);
        } else {
          tokenIds.push(tokenId);
        }
      };

      promises.push(promise(id));
    }
    await Promise.all(promises);

    if (tokenIds.length == 0) {
      return false;
    }

    return [tokenIds, expect];
  };

  const postAPI = async (uri) => {
    try {
      const response = await fetch(uri, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "X-PINGOTHER, Content-Type",
        "Access-Control-Max-Age": 86400,
      }).then((res) => res.json());
      return response;
    } catch {
      alert(`서버에 접근하지 못했습니다. 개발자에게 문의해주세요.`);
      return false;
    }
  };

  const signTransaction = async (voteType, e) => {
    if (status != 0) {
      alert("해당 제안의 투표는 종료되었습니다.");
      return;
    }
    const message = `투표에 참여해주셔서 감사합니다.

    ${proposal_id + 1}번 제안
    ${proposal.title}에 대한 투표입니다.

    한 번 투표할 때마다 최대 100개까지 투표됩니다.

    본인의 수량을 모두 사용할 때까지 투표가 가능합니다.
    
    본 메세지는 블록체인 거래를 발생시키거나 트랜잭션 비용(수수료)이 발생하지 않습니다.

    해당 서명이 공식 홈페이지 URI가 맞는지 여러 번 확인해주세요 :)
    
    Wallet address:
    ${account}
    
    Official Contents WebSite:
    https://nft-kepler-452b.shop
    `;
    try {
      await caver.klay.sign(message, account);
    } catch {
      alert("투표가 취소되었습니다.");
      return;
    }
    const getData = await getTokenIds();

    if (!getData) {
      const accountVote = vote["addresses"][account]["balance"];
      alert(`투표할 수 있는 NFT가 없습니다.\n 앞선 투표 수 : ${accountVote}`);
      return;
    }
    const postURI =
      baseUri + `${proposal_id}/${account}/${voteType}/` + String(getData[0]);

    const postData = await postAPI(postURI);

    if (postData) {
      if (getData[1].length != 0) {
        alert(
          `${getData[1].length}개의 NFT는 이미 투표된 상태입니다. 제외된 상태로 투표가 진행됩니다.`
        );
      }

      if (voteType == 1) {
        alert(`${getData[0].length}개 만큼 찬성 투표가 완료되었습니다.`);
      } else if (voteType == 0) {
        alert(`${getData[0].length}개 만큼 반대 투표가 완료되었습니다.`);
      }
      setVote(postData);
    } else {
      alert("투표중 에러가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="container">
      <div className="Proposal__before">
        <Link to="/governance">
          <div className="prev">
            <img src="images/governance/goback.png" />
            <p>목록으로 돌아가기</p>
          </div>
        </Link>
      </div>
      <div className="Proposal__contents">
        <div className="Proposal__title">{proposal.title}</div>
        <div className="Proposal__status">
          <div className="Proposal__period">
            <div className="blockNumber_label">
              <p>시작 블록넘버</p>
              <p>남은 블록넘버</p>
            </div>
            <div className="blockNumber">
              <p>{proposal.blockNumber}</p>
              <p>{blockNum}</p>
            </div>
          </div>
          <div className="Proposal__vote">
            <div className="vote__type">
              <ul>
                <li>찬성</li>
                <li>반대</li>
              </ul>
            </div>
            <div className="vote__count">
              <ul>
                <li>{vote.voteAgree}</li>
                <li>{vote.voteDegree}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="Proposal__info">
          블록이 밀리지 않았다는 가정 하에 {times} 만큼 남았습니다.
        </div>
        <div className="Proposal__proposer">
          <h2 className="sub_title">작성자</h2>
          <p>{account}</p>
        </div>
        <div className="Proposal__detail">
          <h2 className="sub_title">세부 내용</h2>
          <p>{proposal.content}</p>
        </div>
        <div className="Proposal__detail">
          <h2 className="sub_title">요약</h2>
          <p>{proposal.summary}</p>
        </div>
        <div className="Proposal__btn">
          <div
            type="submit"
            className="btn-suggest"
            onClick={(e) => signTransaction(1, e)}
          >
            찬성하기
          </div>
          <div
            type="submit"
            className="btn-suggest"
            onClick={(e) => signTransaction(0, e)}
          >
            반대하기
          </div>
        </div>
        <div className="Vote__nft">
          <h2 className="sub_title">MY NFT</h2>
          <div className="nft__count">
            <p>수량: {balance}개</p>
          </div>
          <div className="nft">
            {tkURI.length != 0 ? (
              tkURI.map((k, i) => {
                return (
                  <>
                    <NFTBox key={k} tokenURI={tkURI[i]}></NFTBox>
                  </>
                );
              })
            ) : (
              <h2>NFT가 없습니다. 투표할 수 없습니다.</h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposal;
