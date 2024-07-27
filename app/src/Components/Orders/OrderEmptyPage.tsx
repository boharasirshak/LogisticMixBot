import type { NextPage } from "next";
import { useRouter } from "next/router";
import { BackButton } from "@vkruglikov/react-telegram-web-app";

const OrderEmptyPage: NextPage<{ onClick: () => void }> = ({ onClick }) => {
  const router = useRouter();

  return (
    <>
      <BackButton onClick={() => router.push("/")} />
      <div className="min-h-screen relative bg-background overflow-hidden flex flex-col items-start justify-start pt-[0rem] px-[0rem] box-border gap-[10rem] text-center text-[1rem] text-black font-inter">
        <div className="self-stretch flex flex-row items-center justify-center">
          <div className="h-[3.5rem] flex-1 relative font-semibold flex items-center justify-center">
            Мои заказы
          </div>
        </div>
        <section className="self-stretch overflow-hidden flex flex-col items-center justify-start p-[2rem] gap-[1rem] text-center text-[1.13rem] text-black font-inter">
          <div className="self-stretch relative font-semibold">
            У вас нет заказов в трекинге
          </div>
          <div className="self-stretch h-[3.19rem] flex flex-row items-center justify-center text-[0.88rem] text-dark-text">
            <div className="self-stretch w-[18.56rem] relative flex items-center justify-center">
              Трек номер вы можете получить у менеджера через которого оформляли заказ
            </div>
          </div>
          <button className="cursor-pointer [border:none] py-[0.75rem] px-[4.19rem] bg-slateblue rounded-2xl overflow-hidden flex flex-row items-center justify-start gap-[0.5rem]"
            onClick={onClick}
          >
            <div className="relative text-[1rem] font-medium font-inter text-white text-center">
                Добавить заказ в трекинг
            </div>
            <img
              className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0"
              alt=""
              src="/images/add-icon.png"
            />
          </button>
        </section>
      </div>
    </>
  );
};

export default OrderEmptyPage;
