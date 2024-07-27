import { useAtom } from "jotai";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import {
  BackButton,
  MainButton,
  useShowPopup
} from "@vkruglikov/react-telegram-web-app";

import Error from "@/Components/Error";
import { authAtom } from "@/state/atoms";
import OrderSearch from "@/Components/Orders/OrderSearch";
import OrderSearchResult from "@/Components/Orders/OrderSearchResult";

interface ChangeHistory {
  date: string;
  message: string;
  image: string;
}

interface Order {
  id: string;
  title: string;
  date: string;
  price: number;
  is_finished: boolean;
  change_history: ChangeHistory[];
}

const ChangeOrderPage = () => {
  const router = useRouter();
  const popup = useShowPopup();
  const [auth,] = useAtom(authAtom);
  const [inputId, setInputId] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [orderInfo, setOrderInfo] = useState<Order>();
  const [progress, setProgress] = useState(false);

  if (!auth.isAdmin) {
    return (
      <Error
        title="Неавторизованный"
        description="Вы не авторизованы для доступа к этой странице."
      />
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(e.target.id);
    setInputContent(e.target.value);
  };

  function findOrder(orderNumber: string) {
    setProgress(true);
    axios
      .get<Order>(`https://logmix.asap-it.tech/api/orders/${orderNumber}`, {
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
      })
      .then((res) => {
        setOrderInfo(res.data);
      })
      .catch((err) => {
        popup({
          message: "Заказ не найден.",
          title: "Не найдено",
          buttons: [{ id: "ok", text: "OK", type: "destructive" }],
        });
      })
      .finally(() => {
        setProgress(false);
      });
  }

  function handleCompleteOrderClick() {
    const formData = new FormData();
    formData.append("is_finished", "true");
    formData.append("message", "Заказ выполнен");
    axios
      .post(
        `https://logmix.asap-it.tech/api/orders/${orderInfo?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
            "Content-Type": "multipart/form-data",
          },
          timeout: 20000,
        }
      )
      .then((res) => {
        setProgress(false);
        popup({
          message: "Заказ помечен как выполненный!",
          type: "ok",
          title: "Успех",
        });
      })
      .catch((err) => {
        const error = err as AxiosError<{ detail: string }>;
        popup({
          message: error.response?.data.detail || "Не удалось установить порядок как завершенный!",
          title: "Ошибка",
          buttons: [{ id: "cancel", text: "Пробовать снова", type: "destructive" }],
        });
      })
      .finally(() => {
        setProgress(false);
      });
  }

  return (
    <>
      {orderInfo ? (
        <>
          <BackButton
            onClick={() => {
              router.push(`/`);
            }}
          />

          <OrderSearchResult
            order={orderInfo}
            onCompleteOrderClick={handleCompleteOrderClick}
            onUpdateOrderClick={() => {
              router.push(`/orders/change/${orderInfo.id}`);
            }}
          />
        </>
      ) : (
        <>
          <BackButton
            onClick={() => {
              router.push("/");
            }}
          />

          <OrderSearch
            inputText="Номер заказа"
            topText="Поиск заказа"
            onChange={handleInputChange}
          />

          <MainButton
            text="Найти заказ"
            color="#6543bc"
            progress={progress}
            onClick={() => {
              if (!inputContent || inputContent === "") {
                return popup({
                  message: "Пожалуйста, введите номер заказа.",
                  title: "Пустой ввод",
                  buttons: [{ id: "ok", text: "OK", type: "destructive" }],
                });
              }

              var orderNumber = document.getElementById(
                inputId
              ) as HTMLInputElement;
              findOrder(orderNumber.value);
            }}
          />
        </>
      )}
    </>
  );
};

export default ChangeOrderPage;
