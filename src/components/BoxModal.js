import React from "react";
import tokenImg from "data/tokenImg.json";

const BoxModal = ({ open, close, boxId, item }) => {
  const box_Type = ["box_normal", "box_rare", "box_unique"];
  return (
    <>
      {open ? (
        <div>
          <div className="fixed top-0 right-0 bottom-0 left-0 z-100 bg-black opacity-70" />
          <div className="animate-show">
            <div className="absolute bg-boxBottom top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/12 min-h-halfScreen m-auto p-2 rounded-md animation-fill-forwards animate-boxFlicker">
              <div className="relative font-GmarketSansBold pt-16">
                <div
                  className="absolute top-5 right-6 text-xl cursor-pointer hover:scale-125"
                  onClick={close}
                >
                  <p>X</p>
                </div>
                <div className="text-center">
                  <video
                    muted="muted"
                    autoPlay="autoPlay"
                    poster={`video/${box_Type[boxId]}.png`}
                    className="w-96 pt-3 m-auto"
                  >
                    <source src={`video/${box_Type[boxId]}.mov`} />
                  </video>
                  <p className="animate-showInfinity text-3xl pt-6 mb-6">
                    상자 여는중 ...
                  </p>
                </div>
                <div className="absolute w-8/12 top-12 left-24 transform py-8 px-2 bg-gradient-to-b from-modalTop to-modalBottom rounded-lg border-4 border-modalBorder scale-0 animation-fill-forwards animation-delay-3000 animate-showDisplay">
                  <img
                    className="w-64 m-auto"
                    src={`images/items/${tokenImg["code"][item]}.png`}
                  />
                  <div className="bg-modalContent w-10/12 m-auto p-2 rounded-md text-center">
                    <p className="p-1">'{tokenImg["name"][item]}'</p>
                    <p className="text-sm">{tokenImg["effect"][item]}</p>
                  </div>
                  <div className="pt-8 text-center">
                    <button
                      className="bg-modalBtn w-24 m-auto p-2 text-lg text-modalBtnBorder rounded-xl border-2 border-modalBtnBorder italic hover:bg-modalBtnBorder hover:border-modalBtn hover:text-modalBtn"
                      onClick={close}
                    >
                      확인
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BoxModal;
