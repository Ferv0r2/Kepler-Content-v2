import React from "react";

const ShopPotion = ({ prev, next, currentPotionIdx, sendTxUp, sendTxMix }) => {
  const potionSize = ["S", "M", "L"];
  const upgrade = potionSize.map((size, i) => {
    if (size === "L") return "";
    return (
      <ul>
        <li className="item_bg">
          <img
            src={`images/items/${currentPotionIdx + 1}${potionSize[i]}.png`}
          />
        </li>
        <li>
          <h2>X</h2>
        </li>
        <li>
          <h1>10</h1>
        </li>
        <li>
          <img src="images/shop/after.png" className="item_arrow" />
        </li>
        <li className="item_bg">
          <img
            src={`images/items/${currentPotionIdx + 1}${potionSize[i + 1]}.png`}
          />
        </li>
        <div className="item_border" onClick={sendTxUp}>
          <p>교환</p>
        </div>
      </ul>
    );
  });

  const mix = potionSize.map((size) => {
    return (
      <ul className="item">
        <li className="item_bg">
          <img src={`images/items/${currentPotionIdx + 1}${size}.png`} />
        </li>
        <li>
          <h2>+</h2>
        </li>
        <li className="item_bg">
          <img src={`images/items/${currentPotionIdx + 2}${size}.png`} />
        </li>
        <li>
          <img src="images/shop/after.png" className="item_arrow" />
        </li>
        <li className="item_bg">
          <img src={`images/items/${currentPotionIdx + 6}${size}.png`} />
        </li>
        <div className="item_border" onClick={sendTxMix}>
          <p>교환</p>
        </div>
      </ul>
    );
  });

  const cactus = potionSize.map((size) => {
    return (
      <ul className="item">
        <li className="item_bg">
          <img src={`images/items/${currentPotionIdx + 1}${size}.png`} />
        </li>
        <li>
          <h2>+</h2>
        </li>
        <li className="item_bg">
          <img src={`images/items/${currentPotionIdx - 3}${size}.png`} />
        </li>
        <li>
          <img src="images/shop/after.png" className="item_arrow" />
        </li>
        <li className="item_bg">
          <img src={`images/items/${currentPotionIdx + 6}${size}.png`} />
        </li>
        <div className="item_border" onClick={sendTxMix}>
          <p>교환</p>
        </div>
      </ul>
    );
  });

  return (
    <div className="table_contents">
      <div className="another">
        <p>현재 보고 있는 종</p>
        <div className="current_type">
          <span className="prev" onClick={prev}>
            <img src="images/shop/prev.png" />
          </span>
          <p>{currentPotionIdx + 1} 종</p>
          <span className="next" onClick={next}>
            <img src="images/shop/next.png" />
          </span>
        </div>
      </div>

      {upgrade}
      {currentPotionIdx !== 4 ? <>{mix}</> : <>{cactus}</>}
    </div>
  );
};

export default ShopPotion;
