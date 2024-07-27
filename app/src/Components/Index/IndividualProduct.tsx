import type { NextPage } from "next";
import Image from "next/image";

type IndividualProductType = {
  id: number;
  itemImg?: string;
  itemName?: string;
  itemPrice?: number;
  onClick: () => void;
};

const IndividualProduct: NextPage<IndividualProductType> = ({
  id,
  itemImg,
  itemName,
  itemPrice,
  onClick,
}) => {
  return (
    <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-[0rem] px-[0.5rem] gap-[0.5rem] text-left text-[0.88rem] text-black font-inter">
      <div className="flex-1 rounded-2xl bg-white overflow-hidden flex flex-col items-start justify-start">
        <div className="self-stretch h-[11.56rem] relative">
          <Image
            className="absolute h-[calc(100%_-45px)] w-[calc(100%_-_20.5px)] top-[2.31rem] right-[0.66rem] bottom-[2.38rem] left-[0.63rem] max-w-full overflow-hidden max-h-full object-cover hover:scale-110 transition-all duration-300 ease-in-out"
            loading="eager"
            alt=""
            src={itemImg as string}
            width={"164"}
            height={"110"}
          />
        </div>
        <div className="self-stretch flex flex-col items-center justify-start p-[0.5rem] gap-[0.5rem]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.25rem]">
            <div className="self-stretch relative font-semibold">
              {itemPrice} ₽
            </div>
            <div className="self-stretch relative text-[0.75rem] text-dark-text hover:scale-105 transition-all duration-400 ease-in-out">
              {itemName}
            </div>
          </div>
          <button
            onClick={onClick}
            className="cursor-pointer [border:none] p-[0.5rem] bg-whitesmoke self-stretch rounded-2xl overflow-hidden flex flex-row items-center justify-center hover:bg-gray-300 transition-all duration-300 ease-in-out"
          >
            <div className="relative text-[0.75rem] font-inter text-black text-center">
              Купить
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualProduct;
