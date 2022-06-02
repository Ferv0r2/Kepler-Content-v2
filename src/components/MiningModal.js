import React from "react";
import miningImg from "data/miningImg.json";

const MiningModal = ({ open, close, pickId, stone, isCount }) => {
  const mining_Type = ["mining_normal", "mining_rare", "mining_unique"];

  const stones = [35, 35, 35];
  const gacha = () => {
    for (let i = 0; i < isCount; i++) {
      stones[i] = stone;
    }
  };

  gacha();

  return (
    <>
      {open ? (
        <div>
          <div className="none fixed top-0 right-0 bottom-0 left-0 z-100 bg-black opacity-70" />
          <div className="flex animate-show">
            <div className="absolute bg-miningBg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 min-h-halfScreen m-auto p-2 rounded-md animation-fill-forwards animate-miningFlicker">
              <div className="relative font-GmarketSansMedium pt-16">
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
                    poster={`video/mining.png`}
                    className="w-10/12 pt-20 m-auto"
                  >
                    <source src={`video/${mining_Type[pickId]}.mov`} />
                  </video>
                  <p className="animate-showInfinity text-3xl pt-16 mb-6">
                    믹스스톤 채굴 중 ...
                  </p>
                </div>
                <div className="absolute w-8/12 transform top-12 left-24 py-8 px-2 bg-gradient-to-b from-miningModalTop to-miningModalBottom rounded-3xl border-8 border-miningModalBorder scale-0 animation-fill-forwards animation-delay-5000 animate-showDisplay">
                  <p className="text-miningModalText text-3xl pt-3">
                    채굴 결과
                  </p>
                  <div className="relative w-full h-96 -mt-4">
                    {pickId == 0 ? (
                      <div className="absolute -mt-8 w-10/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img
                          src={`images/items/${
                            miningImg["code"][stones[0]]
                          }.png`}
                        />

                        <p className="-mt-4 text-xl font-GmarketSansMedium">
                          {miningImg["name"][stones[0]]}
                        </p>
                      </div>
                    ) : null}

                    {pickId == 1 ? (
                      <div className="absolute -mt-8 w-9/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-80 h-80">
                          <img
                            className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2"
                            src={`images/items/${
                              miningImg["code"][stones[0]]
                            }.png`}
                          />
                          <img
                            className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2"
                            src={`images/items/${
                              miningImg["code"][stones[1]]
                            }.png`}
                          />
                        </div>
                        <div className="text-xl pt-8 font-GmarketSansMedium">
                          <p>{miningImg["name"][stones[0]]}</p>
                          <p>{miningImg["name"][stones[1]]}</p>
                        </div>
                      </div>
                    ) : null}

                    {pickId == 2 ? (
                      <div className="absolute -mt-8 w-9/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-80 h-80">
                          <img
                            className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2"
                            src={`images/items/${
                              miningImg["code"][stones[0]]
                            }.png`}
                          />
                          <img
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            src={`images/items/${
                              miningImg["code"][stones[1]]
                            }.png`}
                          />
                          <img
                            className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2"
                            src={`images/items/${
                              miningImg["code"][stones[2]]
                            }.png`}
                          />
                        </div>
                        <div className="text-xl pt-8 font-GmarketSansMedium">
                          <p>{miningImg["name"][stones[0]]}</p>
                          <p>{miningImg["name"][stones[1]]}</p>
                          <p>{miningImg["name"][stones[2]]}</p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="pt-8 text-center">
                    <button
                      className="bg-miningBtnBg text-white w-24 m-auto p-2 text-xl rounded-xl hover:text-miningBtnBg hover:bg-white"
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

      {pickId == 0 && open ? (
        <div className="flex bg-gradient-to-b from-miningModalTop to-miningModalBottom rounded-3xl border-4 border-miningModalBorder w-72 h-32 items-center absolute top-1/4 left-1/2 transform scale-0 -translate-x-0 -translate-y-0 animate-picking animation-delay-4000 animation-fill-forwards">
          <img
            className="w-32 h-32"
            src={`images/items/${miningImg["code"][stones[0]]}.png`}
          />
          <p className="text-center text-lg">{miningImg["name"][stones[0]]}</p>
        </div>
      ) : null}
      {pickId == 1 && open ? (
        <>
          <div className="flex bg-gradient-to-b from-miningModalTop to-miningModalBottom rounded-3xl border-4 border-miningModalBorder w-72 h-32 items-center absolute top-1/4 left-1/2 transform scale-0 -translate-x-0 -translate-y-0 animate-picking animation-delay-4000 animation-fill-forwards">
            <img
              className="w-32 h-32"
              src={`images/items/${miningImg["code"][stones[0]]}.png`}
            />
            <p className="text-center text-lg">
              {miningImg["name"][stones[0]]}
            </p>
          </div>
          <div className="flex bg-gradient-to-b from-miningModalTop to-miningModalBottom rounded-3xl border-4 border-miningModalBorder w-72 h-32 items-center absolute top-2/3 left-1/3 transform scale-0 -translate-x-0 -translate-y-0 animate-picking animation-delay-2500 animation-fill-forwards">
            <img
              className="w-32 h-32"
              src={`images/items/${miningImg["code"][stones[1]]}.png`}
            />
            <p className="text-center text-lg">
              {miningImg["name"][stones[1]]}
            </p>
          </div>
        </>
      ) : null}
      {pickId == 2 && open ? (
        <>
          <div className="flex bg-gradient-to-b from-miningModalTop to-miningModalBottom rounded-3xl border-4 border-miningModalBorder w-72 h-32 items-center absolute top-1/4 left-1/2 transform scale-0 -translate-x-0 -translate-y-0 animate-picking animation-delay-4000 animation-fill-forwards">
            <img
              className="w-32 h-32"
              src={`images/items/${miningImg["code"][stones[0]]}.png`}
            />
            <p className="text-center text-lg">
              {miningImg["name"][stones[0]]}
            </p>
          </div>
          <div className="flex bg-gradient-to-b from-miningModalTop to-miningModalBottom rounded-3xl border-4 border-miningModalBorder w-72 h-32 items-center absolute top-2/3 left-1/3 transform scale-0 -translate-x-0 -translate-y-0 animate-picking animation-delay-2500 animation-fill-forwards">
            <img
              className="w-32 h-32"
              src={`images/items/${miningImg["code"][stones[1]]}.png`}
            />
            <p className="text-center text-lg">
              {miningImg["name"][stones[1]]}
            </p>
          </div>
          <div className="flex bg-gradient-to-b from-miningModalTop to-miningModalBottom rounded-3xl border-4 border-miningModalBorder w-72 h-32 items-center absolute top-1/3 left-1/3 transform scale-0 -translate-x-0 -translate-y-0 animate-picking animation-delay-1000 animation-fill-forwards">
            <img
              className="w-32 h-32"
              src={`images/items/${miningImg["code"][stones[2]]}.png`}
            />
            <p className="text-center text-lg">
              {miningImg["name"][stones[2]]}
            </p>
          </div>
        </>
      ) : null}
    </>
  );
};

export default MiningModal;
