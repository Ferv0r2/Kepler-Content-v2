import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSetRecoilState } from "recoil";
import { bgState } from "components/states";

const Home = () => {
  const setBg = useSetRecoilState(bgState);

  useEffect(() => {
    setBg("bg-main");
  }, []);

  return (
    <div className="min-h-screen max-w-3xl m-auto">
      <div className="relative w-80 h-64 sm:w-128 sm:h-108 m-auto">
        <img src="images/main_banner.png" />
      </div>
      <div className="max-w-xl md:max-w-2xl m-auto text-center text-base md:text-lg text-light_gray items-center font-GmarketSansMedium italic">
        <div className="block sm:flex w-11/12 m-auto items-center">
          <Link
            to="/evolution"
            className="w-1/2 my-3 m-auto px-8 py-2 cursor-pointer hover:text-hover_pink"
          >
            <p className="w-full m-auto py-4 px-3 border-4 border-gray-100 rounded">
              Today's Evolution
            </p>
          </Link>
          <Link
            to="/box"
            className="w-1/2 my-3 m-auto px-8 py-2 cursor-pointer hover:text-hover_pink"
          >
            <p className="w-full m-auto py-4 px-3 border-4 border-gray-100 rounded">
              Random Box
            </p>
          </Link>
        </div>
        <div className="block sm:flex w-11/12 m-auto items-center">
          <Link
            to="/mining"
            className="w-full my-3 m-auto px-8 py-2 cursor-pointer hover:text-hover_pink"
          >
            <p className="w-full m-auto py-4 px-3 border-4 border-gray-100 rounded">
              Mining
            </p>
          </Link>
          <Link
            to="/shop"
            className="flex w-full m-auto px-8 py-2 cursor-pointer hover:text-hover_pink"
          >
            <p className="w-full m-auto py-4 px-3 border-4 border-gray-100 rounded">
              Goldot Shop
            </p>
          </Link>
        </div>
        <div className="w-11/12 m-auto px-8">
          <Link
            to="/governance"
            className="w-full p-4 cursor-pointer hover:text-hover_pink"
          >
            <p className="w-full m-auto py-4 px-3 border-4 border-gray-100 rounded">
              Governance
            </p>
          </Link>
        </div>
        <div className="block sm:flex w-9/12 m-auto text-sm sm:text-base my-4">
          <div className="w-full md:w-1/2 pb-5">
            <p>More Information?</p>
          </div>
          <div className="w-full md:w-1/2 pb-5">
            <a
              href="https://docs.kepler-452b.net/"
              className="flex justify-center items-center hover:text-hover_pink"
            >
              <p>GUIDE BOOK</p>
              <div className="relative w-4 h-4 ml-3 mb-1">
                <img src="images/external.png" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
