import React from "react";
import OrderHeader from "./OrderHeader";
import { BackButton } from "@vkruglikov/react-telegram-web-app";
import { useRouter } from "next/router";
import { formatDate } from "@/utils/date";

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

interface Props {
  order: Order;
  onCompleteOrderClick: () => void;
  onUpdateOrderClick: () => void;
}

const OrderSearchResult: React.FC<Props> = ({
  order,
  onCompleteOrderClick,
  onUpdateOrderClick
}) => {
  const router = useRouter();

  return (
    <>
    <BackButton 
      onClick={() => {
        router.push("/orders/change");      
      }}
    />
    <div className="w-full min-h-screen bg-background flex flex-col text-center text-black font-inter">
      <OrderHeader date={formatDate(order.date)} id={order.id} price={order.price} title={order.title} />
      <section className="flex flex-col items-center gap-[1.63rem] mt-5">
        <div className="flex flex-row py-px-4 gap-2 w-[90%] ml-1">
          <button
            className="cursor-pointer py-4 pr-5 pl-3 bg-logimix-green flex-1 rounded-2xl flex items-center justify-start text-white font-medium hover:scale-105 transition-transform duration-300 ease-in-out"
            onClick={ onCompleteOrderClick}
          >
            <span className="flex-1 text-center">Завершить заказ</span>
            <img
              className="h-6 w-6 ml-[-0.16rem]"
              alt="Update order"
              src="/images/completed-white.png"
            />
          </button>
          <button
            className="cursor-pointer py-4 pr-5 pl-3 bg-purple-light flex-1 rounded-2xl flex items-center justify-start text-white font-medium hover:scale-105 transition-transform duration-300 ease-in-out"
            onClick={onUpdateOrderClick}
          >
            <span className="flex-1 text-center">Обновить заказ</span>
            <img
              className="h-6 w-6 ml-[-0.16rem]"
              alt="Update order"
              src="/images/edit-icon.png"
            />
          </button>
        </div>
        {/* The change_history lies here */}
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
      </section>
    </div>
    </>
  );
};

export default OrderSearchResult;
