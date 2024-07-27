import axios from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { BackButton, useInitData } from "@vkruglikov/react-telegram-web-app";

import Error from "@/Components/Error";
import LoadingScreen from "@/Components/LoadingScreen";
import OrderHeader from "@/Components/Orders/OrderHeader";

import { authAtom } from "@/state/atoms";
import { formatDate } from "@/utils/date";


interface ChangeHistory {
  date: string;
  message: string;
  image?: string;
}

interface OrderInfo {
  id: string;
  title: string;
  date: string;
  price: number;
  is_finished: boolean;
  change_history: ChangeHistory[];
}

const OrderPage = ({ order }: { order: OrderInfo }) => {
  const router = useRouter();
  const [auth,] = useAtom(authAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!order) {
    return (
      <>
        <BackButton onClick={() => router.push(`/orders?jwt=${auth.jwt}`)} />
        <Error
          title="Заказ не найден"
          description="Заказа, который вы ищете, не существует."
        />
      </>
    );
  }

  return (
    <div>
      <BackButton onClick={() => router.push(`/orders?jwt=${auth.jwt}`)} />
      <div className="w-full min-h-screen relative bg-background overflow-hidden flex flex-col items-start justify-start pt-0 px-0 pb-[169px] box-border text-left text-base text-black font-inter">
        <OrderHeader
          date={formatDate(order.date)}
          id={order.id}
          price={order.price}
          title={order.title}
        />

        {order.change_history.map((change, index) => (
          <>
            <div className="flex flex-col items-end justify-start pt-0 px-0 mb-5">
              <div className="self-stretch flex flex-row p-4 w-screen">
                <div className="relative font-semibold w-[40%]">
                  {formatDate(change.date)}
                </div>
                <div className="flex flex-row-reverse w-[60%] pr-5">
                  <div className="relative text-dark-text justify-start overflow-hidden break-words">
                    {change.message}
                  </div>
                </div>
              </div>
              {change.image && !change.image.includes("example.com") && (
                <>
                  <div className="flex flex-row-reverse pr-10 mb-5">
                    <img
                      className="rounded-2xl h-[12rem] w-[12rem]"
                      loading="eager"
                      alt="product image"
                      src={change.image}
                    />
                  </div>
                </>
              )}
              {/* Last one should not have a upward facing arrow */}
              {index < order.change_history.length - 1 && (
                <div className="flex flex-row-reverse pr-8">
                  <img src="/images/up-icon.png" alt="up icon" />
                </div>
              )}
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const id = context.params.id;
  const jwt = context.query.jwt;
  try {
    const res = await axios.get<OrderInfo>(
      `https://logmix.asap-it.tech/api/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return {
      props: {
        order: res.data,
      },
    };
  } catch {
    return {
      props: { order: {} },
    };
  }
};

export default OrderPage;
