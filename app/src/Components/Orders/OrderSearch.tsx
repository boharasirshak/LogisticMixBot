import type { NextPage } from "next";

interface Props {
  topText: string;
  inputText: string;
  description?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OrderSearch: NextPage<Props> = ({ topText, inputText, description, onChange }) => {
  return (
    <>
      <div className="w-full min-h-screen relative bg-background overflow-hidden flex flex-col items-center justify-start pt-[0rem] px-[0rem] pb-[3rem] box-border gap-[34.06rem]">
        <section className="self-stretch flex flex-col items-start justify-start gap-[2rem] text-center text-[1rem] text-black font-inter">
          <div className="self-stretch flex flex-row items-center justify-center">
            <div className="h-[3.5rem] flex-1 relative font-semibold flex items-center justify-center">
              {topText}
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[1rem]">
            <div className="self-stretch flex flex-row flex-wrap items-start justify-center pt-[1rem] px-[1rem] pb-[0rem] box-border gap-[0.5rem] min-h-[3.5rem] cursor-pointer">
              <img src="/images/pencil-icon.svg" alt="pencil" />
              <div className="ml-2 flex-1 flex flex-col items-start justify-start gap-[1.13rem] min-w-[13.38rem] w-full">
                <input
                  className="w-full border-b [outline:none] font-inter text-[1rem] bg-[transparent] h-[1.19rem] relative text-dark-text text-start flex items-center justify-center"
                  placeholder={inputText}
                  type="text"
                  id="input-text"
                  onInput={onChange}
                />
                <div className="self-stretch h-[0.06rem] relative bg-gainsboro" />
              </div>
            </div>
            {description && (
              <p className="w-full h-[3rem] relative flex items-center justify-center">
                <p className="text-sm text-left p-5 text-[#6B6B6B]">
                    {description}
                </p>
              </p>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default OrderSearch;
