import React from "react";
import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useInitData } from "@vkruglikov/react-telegram-web-app";

import Error from "@/Components/Error";
import { authAtom } from "@/state/atoms";

interface Props {
  onSearchBoxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} 

const ManagerHeaders: NextPage<Props> = ({ onSearchBoxChange }) => {
  const [auth,] = useAtom(authAtom);
  const initData = useInitData();
  const router = useRouter();

  if (!auth.isAdmin) {
    return (
      <Error
        title="Неавторизованный"
        description="Вы не авторизованы для доступа к этой странице."
      />
    );
  }

  const createOrder = () => {
    router.push("/orders/create");
  };

  const changeOrder = () => {
    router.push("/orders/change");
  };

  const createProduct = () => {
    router.push("/products/create");  
  };

  const getOrders = () => {
    router.push(`/orders?jwt=${auth.jwt}`)
  }

  return (
    <>
      <section className="self-stretch flex flex-col items-start justify-start text-center text-[1rem] text-black font-inter w-[100%]">
        <div className="self-stretch flex flex-row items-center justify-center">
          <div className="h-[3.5rem] flex-1 relative font-semibold flex items-center justify-center">
            Товары
          </div>
        </div>
        <div className="self-stretch overflow-hidden flex flex-row items-center justify-start py-[0.5rem] px-[1rem] cursor-pointer text-left">
          <div className="flex-1 flex flex-row items-center justify-start gap-[0.5rem]">
            <img
              className="h-[2.5rem] w-[2.5rem] relative object-cover"
              loading="eager"
              alt=""
              src="/images/user-profile.png"
            />
            <div className="flex-1 relative font-semibold">
                Привет, {initData[0]?.user?.first_name || "Погрузка..."}!
            </div>
          </div>
          <button
            onClick={getOrders}
          >
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0 hover:scale-105"
              loading="eager"
              alt=""
              src="/images/basket-icon.svg"
            />
          </button>
        </div>
        <div className="self-stretch flex items-center justify-center gap-[6px] content-center text-center text-base text-white font-inter pr-3 pl-3 mt-3">
          <button
              className="rounded-2xl overflow-hidden flex flex-row flex-wrap items-center justify-center bg-slateblue [border:none] cursor-pointer mb-2 flex-1 hover:scale-105 transition-all duration-300 ease-in-out hover:font-semibold focus:bg-slate-700 p-3"
              onClick={createOrder}
            >
              Создать 
              <br />
              заказ
              <img
                className="h-5 w-5 relative overflow-hidden ml-1"
                alt=""
                src="images/edit-icon.png"
              />
            </button>
            <button
              className="rounded-2xl overflow-hidden flex flex-row flex-wrap items-center justify-center bg-slateblue [border:none] cursor-pointer mb-2 flex-1 hover:scale-105 transition-all duration-300 ease-in-out hover:font-semibold focus:bg-slate-700 p-3"
              onClick={changeOrder}
            >
              Изменить
              <br />
              Заказ
              <img
                className="h-5 w-5 relative overflow-hidden ml-1"
                alt=""
                src="images/edit-icon.png"
              />
            </button>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start">
          <button
            className="cursor-pointer [border:none] p-0 bg-[transparent] self-stretch flex flex-row items-center justify-center hover:scale-95 transition-all duration-300 ease-in-out hover:font-semibold"
            onClick={createProduct}
          >
            <div className="w-[361px] rounded-2xl bg-[#2f8398] overflow-hidden shrink-0 flex flex-row items-center justify-center py-3 px-5 box-border gap-[8px] focus:bg-[#25697a]">
              <div className="relative text-base font-medium font-inter text-white text-center ">
                Создать товар
              </div>
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0"
                alt=""
                src="images/add-icon.png"
              />
            </div>
          </button>
          <div className="self-stretch overflow-hidden flex flex-row items-center justify-center p-2">
            <div className="flex-1 rounded-31xl bg-white overflow-hidden flex flex-row items-start justify-start py-2 px-3 gap-[8px]">
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                alt=""
                src="images/search-icon.png"
              />
              <input
                className="w-[calc(100%_-_48px)] [border:none] [outline:none] font-inter text-base bg-[transparent] h-6 flex-1 relative text-dark-text text-left flex items-center min-w-[193px]"
                placeholder="Найти кроссовки, одежду, технику..."
                type="text"
                onChange={onSearchBoxChange}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManagerHeaders;
