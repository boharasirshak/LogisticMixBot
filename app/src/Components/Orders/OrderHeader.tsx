import type { NextPage } from "next";

interface Props {
  id: string;
  price: number;
  date: string;
  title: string;
}

const OrderHeader: NextPage<Props> = ({ id, price, date, title }) => {
  return (
    <section className="flex flex-col text-base text-black font-inter w-full">
      <div className="flex justify-center items-center h-14">
        <div className="font-semibold">{id}</div>
      </div>
      <div className="flex flex-col py-2 px-4 text-left">
        <div className="bg-white rounded-2xl p-4">
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center">
              <div className="font-semibold">{date}</div>
              <div className="flex items-center">
                <div className="text-dark-text mr-2">{id}</div>
                <img
                  onClick={() => {
                    navigator.clipboard.writeText(id);
                  }}
                  className="cursor-pointer hover:scale-110"
                  loading="eager"
                  alt="copy to clipboard"
                  src="/images/copytoclipboard.png"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>{title}</div>
              <div>{price} ₽</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderHeader;
