import React from "react";

const ShopKey = ({ id, input1, input2, input3, num1, num2, num3, setOpen }) => {
  const key = ["normal_key", "rare_key", "unique_key"];
  const inp = [input1, input2, input3];
  const num = [num1, num2, num3];

  const data = [...Array(id + 1)].map((v, i) => {
    return (
      <div className="py-2">
        <input
          className="w-full bg-white text-black text-center"
          placeholder="번호 입력"
          onChange={inp[i]}
          value={num[i]}
        />
      </div>
    );
  });

  return (
    <>
      <ul className="flex w-full py-8 px-4 sm:pl-12 items-center text-base sm:text-lg">
        <li className="w-4/12 m-auto">{data}</li>
        <li className="w-2/12 m-auto">
          <img
            className="w-10/12 sm:w-1/2 m-auto"
            src="images/shop/after.png"
          />
        </li>
        <li className="w-3/12 sm:w-2/12 m-auto bg-shopItem rounded-2xl">
          <img src={`images/shop/${key[id]}.png`} />
        </li>
        <div
          className="hidden sm:block w-4/12 m-auto text-2xl cursor-pointer hover:text-shopItem"
          onClick={setOpen}
        >
          <p className="border-2 w-1/2 p-2 m-auto">교환</p>
        </div>
      </ul>
      <div
        className="block sm:hidden w-5/12 m-auto text-xl cursor-pointer hover:text-shopItem"
        onClick={setOpen}
      >
        <p className="border-2 w-1/2 p-2 m-auto">교환</p>
      </div>
    </>
  );
};

export default ShopKey;
