import { useAtom } from "jotai";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import React from "react";
import {
  MainButton,
  useShowPopup,
  BackButton,
} from "@vkruglikov/react-telegram-web-app";

import Error from "@/Components/Error";
import { authAtom } from "@/state/atoms";

interface IResponse {
  id: string;
  title: string;
  date: string;
  price: number;
  is_finished: false;
  change_history: any[];
}

const CreateOrder = () => {
  const router = useRouter();
  const popup = useShowPopup();
  const [auth,] = useAtom(authAtom);

  if (!auth.isAdmin) {
    return (
      <Error
        title="Неавторизованный"
        description="Вы не авторизованы для доступа к этой странице."
      />
    );
  }

  async function createOrder() {
    const orderName =
      document.querySelector<HTMLInputElement>("#order-name")?.value;
    const orderPrice = document.querySelector<HTMLInputElement>("#order-price")
      ?.value as string;
    if (!orderName || !orderPrice) {
      return await popup({
        message: "Пожалуйста, заполните все поля!",
        title: "Ошибка!",
        buttons: [{ type: "destructive", text: "Ok" }],
      });
    }

    if (
      isNaN(parseInt(orderPrice)) ||
      isNaN(Number(orderPrice)) ||
      parseInt(orderPrice) <= 0
    ) {
      return await popup({
        message: "Пожалуйста, введите действительную цену в положительных цифрах!",
        title: "Ошибка!",
        buttons: [{ type: "destructive", text: "Ok" }],
      });
    }

    try {
      var response = await axios.post<IResponse>(
        `https://logmix.asap-it.tech/api/orders`,
        {
          title: orderName,
          price: orderPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      );
      await popup({
        message: "Заказ создан успешно!",
        title: "Успех!",
        buttons: [
          { type: "ok", text: "OK" },
          { type: "close", text: "Close" },
        ],
      });
      router.push(`/orders/success/${response.data.id}`);
    } catch (error) {
      var err = error as AxiosError;
      await popup({
        message: `Не удалось создать заказ: Код состояния ${err.status}`,
        title: "Ошибка!",
        buttons: [{ type: "destructive", text: "Ok" }],
      });
      return (
        <Error
          title="Ошибка"
          description="При создании заказа произошла ошибка."
        />
      );
    }
  }

  return (
    <>
      <BackButton
        onClick={() => {
          router.push("/");
        }}
      />
      <div className="w-full min-h-screen relative bg-background overflow-hidden flex flex-col items-center justify-start pt-[0rem] px-[0rem] pb-[3rem] box-border gap-[34.06rem]">
        <section className="self-stretch flex flex-col items-start justify-start gap-[2rem] text-center text-[1rem] text-black font-inter">
          <div className="self-stretch flex flex-row items-center justify-center">
            <div className="h-[3.5rem] flex-1 relative font-semibold flex items-center justify-center">
              Создать заказ
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[1rem]">
            <div className="self-stretch flex flex-row flex-wrap items-start justify-center pt-[1rem] px-[1rem] pb-[0rem] box-border gap-[0.5rem] min-h-[3.5rem] cursor-pointer">
              <img src="/images/pencil-icon.svg" alt="pencil" />
              <div className="ml-2 flex-1 flex flex-col items-start justify-start gap-[1.13rem] min-w-[13.38rem] w-full">
                <input
                  className="w-full [border:none] [outline:none] font-inter text-[1rem] bg-[transparent] h-[1.19rem] relative text-dark-text text-start flex items-center justify-center"
                  placeholder="Название заказа"
                  type="text"
                  id="order-name"
                />
                <div className="self-stretch h-[0.06rem] relative bg-gainsboro" />
              </div>
            </div>
            <div className="self-stretch flex flex-row flex-wrap items-start justify-center pt-[1rem] px-[1rem] pb-[0rem] box-border gap-[0.5rem] min-h-[3.5rem] cursor-pointer">
              <img
                className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0"
                loading="eager"
                alt=""
                src="/images/graph-icon.svg"
              />
              <div className="ml-2 flex-1 flex flex-col items-start justify-start gap-[1.13rem] min-w-[13.38rem]">
                <input
                  className="w-full [border:none] [outline:none] font-inter text-[1rem] bg-[transparent] h-[1.19rem] relative text-dark-text text-start flex items-center justify-center"
                  placeholder="Цена заказа"
                  type="number"
                  id="order-price"
                />
                <div className="self-stretch h-[0.06rem] relative bg-gainsboro" />
              </div>
            </div>
          </div>
        </section>
        <MainButton
          text="Создать заказ"
          color="#6543bc"
          onClick={async () => {
            await createOrder();
          }}
        />
      </div>
    </>
  );
};

export default CreateOrder;
