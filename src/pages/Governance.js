import React from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { proposalState } from "components/states";

const sample_proposals = [
  {
    id: 0,
    title: "Sample Proposal 1",
    contents: "Sample Contents 1",
    summary: "Sample Summary 1",
  },
  {
    id: 1,
    title: "Sample Proposal 2",
    contents: "Sample Contents 2",
    summary: "Sample Summary 2",
  },
  {
    id: 2,
    title: "Sample Proposal 3",
    contents: "Sample Contents 3",
    summary: "Sample Summary 3",
  },
  {
    id: 3,
    title: "Sample Proposal 4",
    contents: "Sample Contents 4",
    summary: "Sample Summary 4",
  },
  {
    id: 4,
    title: "Sample Proposal 5",
    contents: "Sample Contents 5",
    summary: "Sample Summary 5",
  },
];

const status = [0, 1, 2, 3, 4];
const result = ["Voting", "Go", "Stop", "Cancel", "Avoid"];

const Home = () => {
  const setProposals = useSetRecoilState(proposalState);
  setProposals(sample_proposals);
  const section = 0;

  const ids = sample_proposals.slice(section * 5, section * 5 + 5).map((id) => (
    <Link to={`/proposal/${parseInt(id.id) + 1}`}>
      <li key={id.id} className="my-5 py-1">
        {parseInt(id.id) + 1}
      </li>
    </Link>
  ));

  const titles = sample_proposals
    .slice(section * 5, section * 5 + 5)
    .map((id) => (
      <Link to={`/proposal/${parseInt(id.id) + 1}`}>
        <li key={id.id} className="my-5 py-1">
          {id.title}
        </li>
      </Link>
    ));

  const stats = status
    .slice(section * 5, section * 5 + 5)
    .map((stat, index) => (
      <li key={index} className="my-5 py-1">
        {result[stat]}
      </li>
    ));

  return (
    <div className="max-w-4xl m-auto">
      <div>
        <img className="w-10/12 m-auto opacity-100" src="images/banner.svg" />
      </div>
      <div className="w-3/12 py-5 pb-10 m-auto">
        <Link to="/proposal">
          <div className="rounded-md text-point border-2 border-point hover:border-light hover:text-light hover:bg-point cursor-pointer">
            <p className="m-5 text-center text-xl font-bold">Create Proposal</p>
          </div>
        </Link>
      </div>
      <div className="pb-10">
        <div className="w-9/12 bg-gray-300 rounded-md p-8 text-center text-point font-bold flex m-auto">
          <ul className="w-2/12">{ids}</ul>
          <ul className="w-8/12">{titles}</ul>
          <ul className="w-2/12">{stats}</ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
