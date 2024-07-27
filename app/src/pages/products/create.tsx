import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import {
  BackButton,
  MainButton,
  useShowPopup,
} from "@vkruglikov/react-telegram-web-app";

import { authAtom } from "@/state/atoms";
import Error from "@/Components/Error";

interface ProductImg {
  image_url: string;
}

interface AddProductResponse {
  id: number,
  images: ProductImg[],
  title: string,
  price: number
}

const CreateProduct = () => {
  const router = useRouter();
  const popup = useShowPopup();
  const [auth, ] = useAtom(authAtom);
  const [showProgress, setShowProgress] = useState(false);

  if (!auth.isAdmin) {
    <>
     <BackButton 
      onClick={() => {
        router.push("/");
      }}
     />
      <Error 
        description="You are not authorized to access this page"
        title="Unauthorized"
      />
    </>
  }

  const addProduct = () => {
    const productLink = (
      document.getElementById("product-link") as HTMLInputElement
    ).value;
    if (!productLink) {
      return popup({
        message: "Пожалуйста, введите ссылку на продукт",
        type: "close",
        title: "Недопустимый ввод",
      });
    }

    setShowProgress(true);

    axios
      .post<AddProductResponse>(`https://logmix.asap-it.tech/api/products/dewu`, {}, {
        params: {
          link: productLink,
        },
        headers: {
          Authorization: `Bearer ${auth.jwt}`,
        },
        timeout: 10000,
      })
      .then((res) => {
        setShowProgress(false);
        popup({
          message: "Продукт успешно добавлен",
          type: "ok",
          title: "Success",
          buttons: [
            { id: 'redirect', text: 'Готовый продукт', type: 'default'},
            { id: 'add-more', text: 'Добавьте другой продукт', type: 'default'}
          ]
        })
        .then((btnId) => {
          if (btnId === 'redirect') {
            router.push(`/products/${res.data.id}?jwt=${auth.jwt}`);
          }
        });
      })
      .catch((err) => {
        setShowProgress(false);
        popup({
          message: "Не удалось добавить продукт",
          title: "Ошибка",
          buttons: [
            { id: 'cancel', text: 'Пробовать снова', type: 'destructive'}
          ]
        });
      });
  };

  return (
    <>
      <div>
        <BackButton
          onClick={() => {
            router.push("/");
          }}
        />

        <div className="min-h-screen bg-background flex flex-col justify-between pb-6 pt-2">
          <section className="gap-4 text-center text-base text-black font-inter">
            <div className="font-semibold text-xl">Добавить товарt</div>

            <div className="flex flex-row gap-4 mt-8 pl-5">
              <Image
                src="/images/basket-icon-purple.png"
                alt="Basket Icon"
                height={"24"}
                width={"24"}
              />
              <input
                className="w-full border-b outline-none text-base bg-transparent text-dark-text flex-1"
                placeholder="Ссылка на товар"
                type="text"
                id="product-link"
              />
            </div>
          </section>
          {/** Just in Case */
          /* <div className="flex items-center justify-center">
            <button
              onClick={searchProduct}
              className="cursor-pointer border-none p-3 bg-slateblue w-80 rounded-2xl"
            >
              <div className="text-base font-medium font-inter text-white">
                Add Product
              </div>
            </button>
          </div> */}

          <MainButton progress={showProgress} color="#6543bc" text="Добавить товар" onClick={addProduct} />
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
