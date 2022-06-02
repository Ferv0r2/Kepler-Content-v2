import React, { useEffect } from "react";
import caver from "klaytn/caver";

import Nav from "components/Nav";
import Footer from "components/Footer";

import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  bgState,
  scrollState,
  scrollBtnState,
  accountState,
  balanceState,
  networkState,
} from "components/states";

const Layout = ({ children }) => {
  const bg = useRecoilValue(bgState);
  const [scroll, setScroll] = useRecoilState(scrollState);
  const [scrollBtn, setScrollBtn] = useRecoilState(scrollBtnState);
  const [account, setAccount] = useRecoilState(accountState);
  const [network, setNetwork] = useRecoilState(networkState);
  const setBalance = useSetRecoilState(balanceState);

  useEffect(() => {
    loadAccountInfo();
    setNetworkInfo();
  }, []);

  useEffect(() => {
    setBalanceInfo();
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  const handleFollow = () => {
    setScroll(window.pageYOffset);
    if (scroll > 100) {
      setScrollBtn(true);
    } else {
      setScrollBtn(false);
    }
  };

  const toUp = (e) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setScroll(0);
    setScrollBtn(false);
  };

  const loadAccountInfo = async () => {
    const { klaytn } = window;

    if (klaytn) {
      try {
        await klaytn.enable();
        setAccountInfo(klaytn);
        klaytn.on("accountsChanged", () => {
          setAccountInfo(klaytn);
        });
      } catch (error) {
        // console.log(error);
        console.log("User denied account access");
      }
    } else {
      console.log(
        "Non-Kaikas browser detected. You should consider trying Kaikas!"
      );
    }
  };

  const setAccountInfo = async () => {
    const { klaytn } = window;
    if (klaytn === undefined) return;

    const accounts = klaytn.selectedAddress;
    setAccount(accounts);
  };

  const setBalanceInfo = async () => {
    const { klaytn } = window;
    if (klaytn === undefined) return;

    const balances = await caver.klay.getBalance(account);
    setBalance(caver.utils.fromPeb(balances, "KLAY"));
  };

  const setNetworkInfo = async () => {
    const { klaytn } = window;
    if (klaytn === undefined) return;

    setNetwork(klaytn.networkVersion);
    klaytn.on("networkChanged", () => setNetwork(klaytn.networkVersion));
  };

  return (
    <div className={bg}>
      <Nav address={account} network={network} />
      <main>{children}</main>
      <Footer />
      {scrollBtn ? (
        <div className="sticky right-8 bottom-8 ">
          <div className="absolute right-8 bottom-0">
            <div
              className="toUp relative w-14 h-14 cursor-pointer"
              onClick={(e) => toUp()}
            >
              <img src="images/onTop.png" />
            </div>
            <p className="text-top_gray text-center text-sm font-GmarketSansBold">
              On Top
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Layout;
