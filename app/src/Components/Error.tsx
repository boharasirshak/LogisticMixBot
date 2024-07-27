import React from 'react';

interface Props {
  title: string;
  description: string;
}

const Error: React.FC<Props> = ({ title, description }) => {
  return (
    <>
      <div className="bg-background min-h-screen flex items-center justify-center ">
        <section className="overflow-hidden flex flex-col items-center justify-start p-[2rem] gap-[1rem] text-center text-[1.13rem] text-black font-inter">
          <div className="self-stretch relative font-semibold">{title}</div>
          <div className="self-stretch h-[2.13rem] flex flex-row items-center justify-center text-[0.88rem] text-dark-text">
            <div className="self-stretch w-[18.56rem] relative flex items-center justify-center">
              {description}
            </div>
          </div>
          <button className="cursor-pointer [border:none] py-[0.75rem] px-[4.31rem] bg-slateblue rounded-2xl overflow-hidden flex flex-row items-center justify-start gap-[0.5rem]">
            <div className="relative text-[16px] font-inter text-white text-center">
              To try one more time
            </div>

            <img src="/images/reload-icon.svg" alt="reload-icon" />
          </button>
        </section>
      </div>
    </>
  );
};

export default Error;
