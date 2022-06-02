import React from "react";

const Footer = () => {
  const urlMap = [
    {
      link: "https://open.kakao.com/o/gTLz1aTd",
      url: "images/footer_logo.png",
    },
    {
      link: "https://twitter.com/Kepler_NFT",
      url: "images/footer_logo.png",
    },
    {
      link: "https://www.instagram.com/kepler452b_toon/",
      url: "images/opensea.png",
    },
    {
      link: "https://opensea.io/collection/kepler-452b-official",
      url: "images/footer_logo.png",
    },
    {
      link: "https://klu.bs/pfp/0x928267E7dB3d173898553Ff593A78719Bb16929F",
      url: "images/footer_logo.png",
    },
    {
      link: "https://kepler-452b.net/",
      url: "images/footer_logo.png",
    },
  ];
  const urls = urlMap.map((url) => (
    <li key={url.link} className="flex">
      <a className="relative w-8 h-8 m-1.5" href={url.link}>
        <img src={url.url} alt={url.link} />
      </a>
    </li>
  ));

  return (
    <footer className="p-5 m-auto text-base font-[NanumSquareBold] w-full bg-black">
      <div className="block lg:flex justify-center items-center text-gray-50 lg:max-w-5xl max-w-xl m-auto">
        <div className="block sm:flex lg:hidden items-center justify-center m-auto">
          <p className="text-lg text-center m-5">Other Sites?</p>
          <ul className="flex m-5 justify-between">{urls}</ul>
        </div>
        <div className="flex">
          <div className="relative hidden sm:block w-24 h-24 m-auto">
            <img src="images/footer_logo.png" alt="footer_logo" />
          </div>
          <div className="p-8 text-sm sm:text-base">
            <p>
              CEO. Keplin <br />
              Addr. 서울특별시 중구 을지로 1가 케플러연구소 (가상) <br />
              COPYRIGHTⓒ 2022. K452. ALL RIGHT RESERVED.
            </p>
          </div>
        </div>
        <div className="hidden lg:flex m-5 lg:m-10">
          <ul className="flex justify-between">{urls}</ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
