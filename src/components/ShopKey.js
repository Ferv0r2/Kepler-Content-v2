import React from "react";

const ShopKey = ({
  count,
  input1,
  input2,
  input3,
  num1,
  num2,
  num3,
  setOpen,
}) => {
  return (
    <div className="table_contents">
      <div className="items">
        <ul className="item">
          <li>
            <input
              type="text"
              placeholder="번호 기입"
              onChange={input1}
              value={num1}
            />
          </li>
          <li>
            <img src="images/shop/after.png" className="item_arrow" />
          </li>
          <li>
            <img src="images/shop/normal_key.png" className="item_bg" />
          </li>
          <div className="item_border" onClick={setOpen}>
            <p>교환</p>
          </div>
        </ul>
        <div className="item_m" onClick={setOpen}>
          <p>교환</p>
        </div>
      </div>
      <div className="items">
        <ul className="item">
          <div>
            <li>
              <input
                type="text"
                placeholder="번호 기입"
                onChange={input1}
                value={num1}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="번호 기입"
                onChange={input2}
                value={num2}
              />
            </li>
          </div>
          <li>
            <img src="images/shop/after.png" className="item_arrow" />
          </li>
          <li>
            <img src="images/shop/rare_key.png" className="item_bg" />
          </li>
          <div className="item_border" onClick={setOpen}>
            <p>교환</p>
          </div>
        </ul>
        <div className="item_m" onClick={setOpen}>
          <p>교환</p>
        </div>
      </div>
      <div className="items">
        <ul className="item">
          <li>
            <li>
              <input
                type="text"
                placeholder="번호 기입"
                onChange={input1}
                value={num1}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="번호 기입"
                onChange={input2}
                value={num2}
              />
            </li>
            <li>
              <input
                type="text"
                placeholder="번호 기입"
                onChange={input3}
                value={num3}
              />
            </li>
          </li>
          <li>
            <img src="images/shop/after.png" className="item_arrow" />
          </li>
          <li>
            <img src="images/shop/unique_key.png" className="item_bg" />
          </li>
          <div className="item_border" onClick={setOpen}>
            <p>교환</p>
          </div>
        </ul>
        <div className="item_m" onClick={setOpen}>
          <p>교환</p>
        </div>
      </div>
      <div className="item_count">
        <p>남은 NFT 갯수</p>
        <p>{count}</p>
      </div>
    </div>
  );
};

export default ShopKey;
