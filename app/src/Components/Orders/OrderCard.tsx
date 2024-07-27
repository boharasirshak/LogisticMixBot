import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";

type OrderType = {
  id: string;
  date: string;
  price: string;
  description: string;
  onClick: (id: string) => void;

  /** Style props */
  height?: CSSProperties["height"];
  alignSelf?: CSSProperties["alignSelf"];
};

const OrderCard: NextPage<OrderType> = ({
  id,
  date,
  description,
  price,
  height,
  alignSelf,
  onClick,
}) => {

  return (
    <div
      className="cursor-default self-stretch flex flex-col items-start justify-start py-2 px-4 text-left text-base text-black font-inter"
    >
      <div className="self-stretch rounded-2xl bg-white overflow-hidden flex flex-row items-center justify-start p-4 gap-[8px] hover:cursor-text">
        <div className="flex-1 flex flex-col items-start justify-start gap-[8px]">
          <div className="self-stretch overflow-hidden flex flex-row items-center justify-start gap-[4px]">
            <div className="flex-1 relative font-semibold">{date}</div>
            <div className="relative text-dark-text">{id}</div>
            <div className="h-4 w-4 relative overflow-hidden shrink-0">
              <img
              onClick={() => {
                  navigator.clipboard.writeText(id);
              }}
                className="absolute overflow-hidden max-h-full cursor-pointer hover:scale-110"
                loading="eager"
                alt=""
                src="/images/copytoclipboard.png"
              />
            </div>
          </div>
          <div className="self-stretch flex flex-row items-center justify-between text-sm text-dark-text">
            <div
              className="flex-1 overflow-auto break-words max-w-24"
              style={{ wordWrap: "break-word" }}
            >
              {description} 
            </div>
            <div className="ml-4 relative text-right">{price}</div>
          </div>
        </div>
        <img
          onClick={() => {
            onClick(id);
          }}
          className="ml-2 h-6 w-6 relative overflow-hidden shrink-0 cursor-pointer hover:scale-110"
          loading="eager"
          alt=""
          src={"/images/arrow-icon.png"}
        />
      </div>
    </div>
  );
};

export default OrderCard;
