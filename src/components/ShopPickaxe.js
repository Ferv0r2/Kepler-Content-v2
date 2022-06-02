import React from "react";

const ShopPickaxe = ({ count, sendTx }) => {
  return (
    <div>
      <div className="table_contents">
        <div className="items">
          <ul className="item">
            <li className="item_bg">
              <img src="images/shop/faded_stone.png" />
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
              <img src="images/shop/normal_pickaxe.png" />
            </li>
            <div className="item_border" onClick={sendTx}>
              <p>교환</p>
            </div>
          </ul>

          <div className="item_m" onClick={sendTx}>
            <p>교환</p>
          </div>
        </div>
        <div className="items">
          <ul className="item">
            <li className="item_bg">
              <img src="images/shop/faded_stone.png" />
            </li>
            <li>
              <h2>X</h2>
            </li>
            <li>
              <h1>20</h1>
            </li>
            <li>
              <img src="images/shop/after.png" className="item_arrow" />
            </li>
            <li className="item_bg">
              <img src="images/shop/rare_pickaxe.png" />
            </li>
            <div className="item_border" onClick={sendTx}>
              <p>교환</p>
            </div>
          </ul>

          <div className="item_m" onClick={sendTx}>
            <p>교환</p>
          </div>
        </div>
        <div className="items">
          <ul className="item">
            <li className="item_bg">
              <img src="images/shop/faded_stone.png" />
            </li>
            <li>
              <h2>X</h2>
            </li>
            <li>
              <h1>30</h1>
            </li>
            <li>
              <img src="images/shop/after.png" className="item_arrow" />
            </li>
            <li className="item_bg">
              <img src="images/shop/unique_pickaxe.png" />
            </li>
            <div className="item_border" onClick={sendTx}>
              <p>교환</p>
            </div>
          </ul>

          <div className="item_m" onClick={sendTx}>
            <p>교환</p>
          </div>
        </div>
        <div className="item_count">
          <p>남은 빛바랜 스톤 갯수</p>
          <p>{count}</p>
        </div>
      </div>
    </div>
  );
};

export default ShopPickaxe;
