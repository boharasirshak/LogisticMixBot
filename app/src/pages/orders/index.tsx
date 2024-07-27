import React from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { BackButton } from "@vkruglikov/react-telegram-web-app";

import OrderCard from "@/Components/Orders/OrderCard";
import OrderEmptyPage from "@/Components/Orders/OrderEmptyPage";
import { formatDate } from "@/utils/date";
import { authAtom } from "@/state/atoms";


interface Order {
  id: string;
  title: string;
  date: string;
  price: number;
}

const GetOrders = ({ orders }: { orders: Order[] }) => {
  const router = useRouter();
  const [auth, ] = useAtom(authAtom);

  function handleOrderEmptyClick() {
    router.push("/orders/track");
  }

  if (orders.length === 0){
    return (
      <>
      <OrderEmptyPage 
        onClick={handleOrderEmptyClick}
      />
      </>
    )
  }

  const addOrderToTracking = () => {
    router.push('/orders/track');
  };

  const onOrderClick = (id: string) => {
    router.push(`/orders/${id}?jwt=${auth.jwt}`);
  };

  return (
    <div>
      <BackButton onClick={() => router.push("/")} />
      <div className="w-full relative bg-background overflow-hidden flex flex-col items-center justify-start pt-0 px-0 pb-[324px] box-border gap-[8px] text-center text-base text-black font-inter">
        <div className="self-stretch flex flex-row items-center justify-center">
          <div className="h-14 flex-1 relative font-semibold flex items-center justify-center">
            Мои заказы
          </div>
        </div>
        <button
          className="cursor-pointer [border:none] py-3 px-5 bg-slateblue w-[361px] rounded-2xl overflow-hidden flex flex-row items-center justify-center box-border gap-[8px]"
          onClick={addOrderToTracking}
        >
          <div className="relative text-base font-medium font-inter text-white text-center">
            Добавить заказ в трекинг
          </div>
          <img
            className="h-6 w-6 relative overflow-hidden shrink-0"
            alt=""
            src="images/add-icon.png"
          />
        </button>
        <section className="self-stretch flex flex-col items-start justify-start gap-[2px] cursor-pointer">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              date={formatDate(order.date)}
              description={order.title}
              price={`RUB ${order.price}`}
              height="unset"
              alignSelf="unset"
              onClick={onOrderClick}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

interface GetOrdersResponse {
  orders: Order[];
  page: number;
  pages_count: number;
}

export const getServerSideProps = async (context: any) => {
  const jwt = context.query.jwt;

  try {
    const res = await axios.get<GetOrdersResponse>(
      `https://logmix.asap-it.tech/api/orders`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return { props: {orders: res.data.orders} };
  } catch{
    return {
      props: { orders: [] },
    };
  }
};

export default GetOrders;
