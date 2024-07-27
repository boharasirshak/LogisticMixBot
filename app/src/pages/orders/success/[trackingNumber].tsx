import React from "react";
import { useRouter } from "next/router";
import { BackButton } from "@vkruglikov/react-telegram-web-app";
import Error from "@/Components/Error";

const OrderCreationSuccess: React.FC = () => {
  const router = useRouter();
  const { trackingNumber } = router.query;
  if (!trackingNumber) {
    return <Error 
      title="Неполный запрос"
      description="Номер отслеживания отсутствует в параметре запроса."
    />;
  }

  function copyCode() {
    navigator.clipboard.writeText(trackingNumber as string);
  }

  return (
    <div>
      <div className="relative bg-background overflow-hidden flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[20.94rem] box-border gap-[17.38rem] text-center text-[1rem] text-black font-inter">
       { /* This is a magical div, that if removed automitically mistakes the design, Sorry :L */ }
      <div className="flex flex-row"></div>
      <BackButton
        onClick={() => {
          router.push(`/orders/create`);
        }}
      />

        <section
          className="self-stretch overflow-hidden flex flex-col items-center justify-start p-[2rem] gap-[1rem] cursor-pointer text-center text-[1.13rem] text-black font-inter"
        >
          <div className="self-stretch relative font-semibold">
            Заказ создан
          </div>
          <div className="self-stretch flex flex-row items-center justify-center text-[0.88rem] text-dark-text">
            <div className="w-[18.56rem] relative flex items-center justify-center">
              Трек номер: {trackingNumber}
            </div>
          </div>
          <button 
            className="cursor-pointer [border:none] py-[0.75rem] px-[4.69rem] bg-slateblue rounded-2xl overflow-hidden flex items-center justify-start"
            onClick={copyCode}
            >
            <span className="text-[1rem] font-medium font-inter text-white text-center">
              Копировать трек номер
            </span>
            <div className="h-[1.5rem] w-[1.5rem] relative">
              <img
                className="absolute h-[70%] w-[100%] top-[12.5%] right-[29.17%] bottom-[29.17%] left-[12.5%] rounded-md max-w-full overflow-hidden max-h-full"
                alt=""
                src="/images/copy-icon.svg"
              />
            </div>
          </button>
        </section>
      </div>
    </div>
  );
};

export default OrderCreationSuccess;
