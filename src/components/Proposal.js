import React from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { proposalState } from "components/states";

const Proposal = () => {
  const proposals = useRecoilValue(proposalState);
  const params = useParams();
  const proposal_id = parseInt(params.id) - 1;
  const proposal = proposals[proposal_id];

  return (
    <div className="max-w-4xl m-auto pb-20">
      <div className="mt-10 p-10 m-auto rounded-md text-gray-800 text-center">
        <div className="relative p-4 mb-10 border-b-4 border-gray-800">
          <p className="font-serif text-5xl ">{proposal.title}</p>
          <Link to="/governance">
            <p className="absolute top-0 right-0 text-lg py-1 px-2 font-bold rounded-md bg-gray-800 text-light cursor-pointer">
              Back
            </p>
          </Link>
        </div>

        <form>
          <div className="flex w-11/12 p-4 pb-24 m-auto">
            <div className="w-6/12 p-4 m-auto">
              <p className="font-bold py-5 text-2xl">Period</p>
              <div className="flex p-2 w-full rounded-md">
                <p className="w-1/2 font-bold text-lg text-point">Start</p>
                <p className="w-1/2">24H</p>
              </div>
              <div className="flex p-2 w-full rounded-md">
                <p className="w-1/2 font-bold text-lg text-point">The End</p>
                <p className="w-1/2">12:16:43</p>
              </div>
            </div>
            <div className="w-6/12 p-4 m-auto">
              <p className="font-bold py-5 text-2xl">Vote</p>
              <div className="flex p-2 w-full rounded-md">
                <p className="w-1/2 font-bold text-lg text-point">Agree</p>
                <p className="w-1/2">200</p>
              </div>
              <div className="flex p-2 w-full rounded-md">
                <p className="w-1/2 font-bold text-lg text-point">Degree</p>
                <p className="w-1/2">100</p>
              </div>
            </div>
          </div>
          <div className="w-11/12 p-4 m-auto">
            <p className="font-bold py-5 text-2xl">Contents</p>
            <div className="p-2 w-full min-h-sm rounded-md">
              {proposal.contents}
            </div>
          </div>
          <div className="w-11/12 p-4 m-auto">
            <p className="font-bold py-5 text-2xl">Summary</p>
            <div className="p-2 w-full min-h-sm rounded-md">
              {proposal.summary}
            </div>
          </div>
          <div className="w-11/12 p-4 pb-24 m-auto">
            <p className="font-bold py-5 text-2xl">Proposer</p>
            {"0x02Db15C368Fe121C8d338eB918eDFD16BD204C5B"}
          </div>

          <div className="flex p-16 border-t-2">
            <div
              type="submit"
              className="w-48 m-auto text-2xl border-2 border-black rounded-md text-center font-bold px-4 py-3 cursor-pointer hover:bg-black hover:text-light"
            >
              Agree
            </div>
            <div
              type="submit"
              className="w-48 m-auto text-2xl border-2 border-black rounded-md text-center font-bold px-4 py-3 cursor-pointer hover:bg-black hover:text-light"
            >
              Degree
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Proposal;
