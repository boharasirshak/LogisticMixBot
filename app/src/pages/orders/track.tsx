import { useAtom } from "jotai"; 
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  BackButton,
  MainButton,
  useShowPopup,
} from "@vkruglikov/react-telegram-web-app";

import { authAtom } from "@/state/atoms";
import OrderSearch from "@/Components/Orders/OrderSearch";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(e.target.id);
    setInputContent(e.target.value);
  };

  function findOrder(orderNumber: string) {
    axios
      .post<Order>(
        `https://logmix.asap-it.tech/api/orders/${orderNumber}/assaign`,
        {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
          },
        }
      )
      .then((res) => {
        popup({
          message: "Успешно добавлен заказ в отслеживание.",
          title: "Добавлен заказ",
          type: "ok",
        }).then((btnId) => {
          router.push(`/orders?jwt=${auth.jwt}`);
        });
      })
      .catch((err) => {
        popup({
          message: "Заказ не найден.",
          title: "Не найдено",
          buttons: [{ id: "ok", text: "OK", type: "destructive" }],
        });
      });
  }

  return (
    <>
      <BackButton
        onClick={() => {
          router.push(`/orders?jwt=${auth.jwt}`);
        }}
      />

      <OrderSearch
        inputText="Трек-номер заказа"
        topText="Добавить заказ"
        onChange={handleInputChange}
        description="Трек номер вы можете получить у менеджера через которого оформляли заказ."
      />

      <MainButton
        text="Добавить заказ"
        color="#6543bc"
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
  );
};

export default ChangeOrderPage;
