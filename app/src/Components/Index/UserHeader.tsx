import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TelegramWebApps } from "telegram-webapps-types";

import Error from "@/Components/Error";
import { authAtom } from "@/state/atoms";

interface Props {
  onSearchBoxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} 

const UserHeader: NextPage<Props> = ({ onSearchBoxChange }) => {
  const [auth,] = useAtom(authAtom);
  const router = useRouter();
  const [initData, setInitData] = useState<TelegramWebApps.WebAppInitData>();

  useEffect(() => {
    setInitData(window.Telegram.WebApp.initDataUnsafe);
  });

  if (!auth.jwt){
    return <Error 
      description="Не удалось подтвердить, пользуетесь ли вы telegram?"
      title="Не удалось продолжить"
    />
  }

  const getOrders = () => {
    router.push(`/orders?jwt=${auth.jwt}`)
  }

  return (
    <>
    <section className="self-stretch flex flex-col items-start justify-start text-center text-[1rem] text-black font-inter">
      <div className="self-stretch flex flex-row items-center justify-center">
        <div className="h-[3.5rem] flex-1 relative font-semibold flex items-center justify-center">
          Goods
        </div>
      </div>
      <div
        className="self-stretch overflow-hidden flex flex-row items-center justify-start py-[0.5rem] px-[1rem] cursor-pointer text-left"
      >
        <div className="flex-1 flex flex-row items-center justify-start gap-[0.5rem]">
          <img
            className="h-[2.5rem] w-[2.5rem] relative object-cover"
            loading="eager"
            alt=""
            src="/images/user-profile.png"
          />
          <div className="flex-1 relative font-semibold">Привет, {initData?.user?.first_name || "Погрузка..."}!</div>
        </div>
        <button onClick={getOrders}>
          <img
            className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 hover:scale-105"
            loading="eager"
            alt=""
            src="/images/basket-icon.svg"
          />
        </button>
      </div>
      <div className="self-stretch overflow-hidden flex flex-row items-center justify-center p-[0.5rem]">
        <div className="flex-1 rounded-31xl bg-white overflow-hidden flex flex-row items-start justify-start py-[0.5rem] px-[0.75rem] gap-[0.5rem]">
          <img
            className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 min-h-[1.5rem]"
            alt=""
            src="/images/search-icon.svg  "
          />
          <input
            className="w-[calc(100%_-_48px)] [border:none] [outline:none] font-inter text-[1rem] bg-[transparent] h-[1.5rem] flex-1 relative text-dark-text text-left flex items-center min-w-[12.06rem]"
            placeholder="Найти кроссовки, одежду, технику..."
            type="text"
            onChange={onSearchBoxChange}
          />
        </div>
      </div>
    </section>
    </>
  );
};

export default UserHeader;
