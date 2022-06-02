import React from "react";

const baseURI =
  "https://klu.bs/pfp/0x928267E7dB3d173898553Ff593A78719Bb16929F/";

const NFTBox = ({ tokenId, tokenURI }) => {
  const onErrorImg = (e) => {
    e.target.style = `display: none`;
  };

  return (
    <div className="NFTBox">
      {tokenId ? (
        <a target="_blank" href={baseURI + tokenId}>
          <p className="NFTBox__name">{tokenId}</p>
          <div className="NFTBox__img">
            <img src={tokenURI} onError={onErrorImg} />
            <video src={tokenURI} autoPlay loop onError={onErrorImg} />
          </div>
        </a>
      ) : (
        <>
          <div className="NFTBox__img">
            <img src={tokenURI} onError={onErrorImg} />
            <video src={tokenURI} autoPlay loop onError={onErrorImg} />
          </div>
        </>
      )}
    </div>
  );
};

export default NFTBox;
