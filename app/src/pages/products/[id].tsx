import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import {
  BackButton,
  useInitData,
  useShowPopup,
} from "@vkruglikov/react-telegram-web-app";

import Error from "@/Components/Error";
import { authAtom } from "@/state/atoms";

interface IImage {
  image_url: string;
}

interface Product {
  id: number;
  images: IImage[];
  title: string;
  price: number;
}

interface Props {
  botToken: string;
  chatId: string;
  product: Product;
}

const Product: React.FC<Props> = ({ botToken, chatId, product }) => {
  const router = useRouter();
  const [auth,] = useAtom(authAtom);
  const { id } = router.query;

  const initData = useInitData();
  const popup = useShowPopup();

  if (!product || !product.id) {
    return (
      <>
        <BackButton
          onClick={() => {
            router.push("/");
          }}
        />
        <Error description="Товар не найден" title="Товар не найден" />
      </>
    );
  }

  function buyButton() {
    axios
      .post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: `@${initData[0]?.user?.username} хочет купить <code>${product?.title}</code>`,
        parse_mode: "HTML",
      })
      .then((response) => {
        popup({
          message: "Отправил сообщение владельцу о вашем заказе!",
          title: "Успех",
        });
      })
      .catch((error) => {
        popup({
          message: "Не удалось отправить сообщение владельцу!!",
          title: "Ошибка!",
          buttons: [
            { text: "Ok", type: "default" },
            { text: "Cancel", type: "destructive" },
          ],
        });
      });
  }

  function deleteButton() {
    axios
      .delete(`https://logmix.asap-it.tech/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${initData[1]}`,
        },
      })
      .then((response) => {
        popup({ message: "Удаленный продукт!", title: "Успех" });
        router.push("/");
      })
      .catch((error) => {
        const err = error as AxiosError<{ detail: string }>;
        popup({
          message: err.response?.data.detail || "Не удалось удалить продукт!!",
          title: "Error!",
          buttons: [
            { text: "Ok", type: "default" },
            { text: "Cancel", type: "destructive" },
          ],
        });
      });
  }

  return (
    <>
      <BackButton
        onClick={() => {
          router.push("/");
        }}
      />
      <div className="w-full relative bg-background overflow-hidden flex flex-col items-center justify-start gap-[1rem]">
        <section className="self-stretch flex flex-col items-start justify-start">
          <div className="self-stretch h-[24.56rem] relative">
            <img
              className="absolute h-[calc(100%_-_75px)] w-[calc(100%_-_21px)] top-[2.31rem] right-[0.69rem] bottom-[2.38rem] left-[0.63rem] max-w-full overflow-hidden max-h-full object-cover"
              loading="eager"
              alt=""
              src={product?.images[0].image_url}
            />
          </div>
          <div className="self-stretch h-[0.06rem] relative bg-dark-icon" />
        </section>
        <section className="self-stretch flex flex-col items-start justify-start py-[0rem] px-[1rem] box-border gap-[1rem] min-h-[13.75rem] text-left text-[1.88rem] text-black font-inter">
          <h2 className="self-stretch h-[4.5rem] relative text-inherit font-semibold font-inherit flex items-center mb-8">
            {product?.title}
          </h2>
          <div className="w-[11.78rem] h-[2.25rem] relative font-semibold flex items-center pr-[1.25rem]">
            {product?.price} ₽
          </div>
          <button
            onClick={buyButton}
            className="cursor-pointer [border:none] py-[0.75rem] px-[1.25rem] bg-slateblue self-stretch rounded-2xl overflow-hidden flex flex-row items-center justify-center gap-[0.5rem]"
          >
            <div className="relative text-[1rem] font-medium font-inter text-white text-center">
              Купить
            </div>
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0"
              alt=""
              src="/images/basket-icon-white.png"
            />
          </button>
          {auth.isAdmin ? (
            <button
              onClick={deleteButton}
              className="cursor-pointer [border:none] py-[0.75rem] px-[1.25rem] bg-light-red self-stretch rounded-2xl overflow-hidden flex flex-row items-center justify-center gap-[0.5rem]"
            >
              <div className="relative text-[1rem] font-medium font-inter text-white text-center">
                Удалить товар
              </div>
              <img
                className="h-[1rem] w-[1rem] relative overflow-hidden shrink-0"
                alt=""
                src="/images/delete-icon.svg"
              />
            </button>
          ) : (
            ""
          )}
        </section>
        <section className="self-stretch rounded-t-2xl rounded-b-none bg-white flex flex-col items-start justify-start p-[1rem] box-border min-h-[48.63rem] text-left text-[1rem] text-black font-inter">
          <div className="self-stretch flex flex-col items-center justify-center gap-[1rem]">
            <div className="self-stretch relative text-[1.25rem] font-semibold">
              Ответы на основные ворпосы
            </div>
            <div className="self-stretch flex flex-col items-center justify-center gap-[0.5rem]">
              <div className="self-stretch relative font-semibold">
                Оригинал?
              </div>
              <div className="self-stretch relative text-[0.88rem] text-dark-text">
                Да, строго оригинал. Возможны все проверки.
              </div>
            </div>
            <div className="self-stretch flex flex-col items-center justify-center gap-[0.5rem]">
              <div className="self-stretch relative font-semibold">
                Сколько дней доставка?
              </div>
              <div className="self-stretch h-[9.56rem] relative text-[0.88rem] text-dark-text flex items-center">
                <span>
                  <p className="m-0">
                    Примерное время доставки 15-20 дней с момента получения посылки на наш склад в Китае
                  </p>
                  <p className="m-0">
                    {" "}
                    Иногда случаются задержки на таможне, которые от нас не зависят, учитывайте и взвешивайте риски при заказе.
                  </p>
                  <p className="m-0">&nbsp;</p>
                  <p className="m-0">
                    {" "}
                    Если товар не пришёл в течение 35 дней - мы готовы сделать вам возврат без лишних вопросов.
                  </p>
                </span>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-center justify-center gap-[0.5rem]">
              <div className="self-stretch relative font-semibold">
                  Доставка в другой город
              </div>
              <div className="self-stretch h-[3.19rem] relative text-[0.88rem] text-dark-text flex items-center">
                <span>
                  <p className="m-0">
                    Почта России или СДЭК - выбор за вами.
                  </p>
                  <p className="m-0">
                    {" "}
                      Для уточнениях данного момента писать менеджеру - @Logmix_order
                  </p>
                </span>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-center justify-center gap-[0.5rem]">
              <div className="self-stretch relative font-semibold">
                Как забрать свой заказ?
              </div>
              <div className="self-stretch h-[5.31rem] relative text-[0.88rem] text-dark-text flex items-center">
                <span>
                  <p className="m-0">
                    Самовывоз в Москве доступен по предварительной договорённости с поддержкой - @Logmix_order
                  </p>
                  <p className="m-0">&nbsp;</p>
                  <p className="m-0">
                    {" "}
                    Адрес самовывоза: м. Семеновская, Щербаковская 3
                  </p>
                </span>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-center justify-center gap-[0.5rem]">
              <div className="self-stretch relative font-semibold">
                Что если не забрать заказ?
              </div>
              <div className="self-stretch h-[2.13rem] relative text-[0.88rem] text-dark-text flex items-center">
                Если вы не заберете заказ в течение 30 дней, то мы его утилизируем
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const botToken = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;
  const id = context.params.id;
  const jwt = context.query.jwt;

  try {
    const res = await axios.get<Product>(
      `https://logmix.asap-it.tech/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return {
      props: {
        botToken,
        chatId,
        product: res.data,
      },
    };
  } catch {
    return {
      props: { botToken, chatId, product: {} },
    };
  }
}

export default Product;
