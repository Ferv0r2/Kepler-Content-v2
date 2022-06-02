import React from "react";
import Slider from "react-slick";

import { useSetRecoilState } from "recoil";
import { pickIdState } from "components/states";

const MiningSlider = () => {
  const setPickId = useSetRecoilState(pickIdState);

  const CustomPrevArrow = ({ onClick, currentSlide }) => {
    setPickId(currentSlide);
    return (
      <div
        className="absolute top-48 -left-16 w-8 h-8 cursor-pointer"
        onClick={() => {
          onClick();
        }}
      >
        <img src="images/mining/prev.png" />
      </div>
    );
  };

  const CustomNextArrow = ({ onClick, currentSlide }) => {
    setPickId(currentSlide);
    return (
      <div
        className="absolute top-48 -right-16 w-8 h-8 cursor-pointer"
        onClick={() => {
          onClick();
        }}
      >
        <img src="images/mining/next.png" />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  return (
    <div className="w-6/12 m-auto text-2xl text-box_text text-center font-[GmarketSansMedium]">
      <Slider {...settings}>
        <div>
          <div className="relative w-108 h-108 m-auto">
            <img src="images/items/1PK.png" alt="Normal" />
          </div>
          <p className="text-shadow">하급 곡괭이</p>
        </div>
        <div>
          <div className="relative w-108 h-108 m-auto">
            <img src="images/items/2PK.png" alt="Rare" />
          </div>
          <p className="text-shadow">중급 곡괭이</p>
        </div>
        <div>
          <div>
            <div className="relative w-108 h-108 m-auto">
              <img src="images/items/3PK.png" alt="Unique" />
            </div>
            <p className="text-shadow">상급 곡괭이</p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default MiningSlider;
