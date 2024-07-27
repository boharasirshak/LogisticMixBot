import { useAtom } from "jotai";
import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  BackButton,
  MainButton,
  useShowPopup,
} from "@vkruglikov/react-telegram-web-app";

import Error from "@/Components/Error";
import { authAtom } from "@/state/atoms";

const CreateChangeHistory = () => {
  const router = useRouter();
  const popup = useShowPopup();
  const [auth,] = useAtom(authAtom);
  const [showProgress, setShowProgress] = React.useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const id = router.query.id;

  if (id === undefined) {
    return <Error title="Недостаточно данных" description="Идентификатор заказа не указан" />;
  }

  if (!auth.isAdmin) {
    return (
      <Error
        title="Неавторизованный"
        description="Вы не авторизованы для доступа к этой странице."
      />
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const changeProductHistory = () => {
    const text = (document.getElementById("text") as HTMLInputElement).value;
    if (!text) {
      return popup({
        message: "Пожалуйста, введите обновление заказа",
        type: "close",
        title: "Недопустимый ввод",
      });
    }
    setShowProgress(true);
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("message", text);
    formData.append("is_finished", isFinished ? "true" : "false");

    axios
      .post(
        `https://logmix.asap-it.tech/api/orders/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.jwt}`,
            'Content-Type': 'multipart/form-data',
          },
          timeout: 20000,
        }
      )
      .then((res) => {
        setShowProgress(false);
        popup({
          message: "Заказ успешно обновлен",
          type: "ok",
          title: "Успех",
          buttons: [
            { id: "redirect", text: "Перейти к заказу", type: "default" },
            { id: "add-more", text: "Добавьте другой заказ", type: "default" },
          ],
        }).then((btnId) => {
          if (btnId === "redirect") {
            router.push(`/orders/${id}?jwt=${auth.jwt}`);
          }
        });
      })
      .catch((err) => {
        const error = err as AxiosError<{detail: string}>;
        popup({
          message: error.response?.data.detail || "Не удалось обновить заказ!",
          title: "Error",
          buttons: [{ id: "cancel", text: "Пробовать снова", type: "destructive" }],
        });
      })
      .finally(() => {
        setShowProgress(false);
      });
  };

  return (
    <>
      <div>
        <BackButton
          onClick={() => {
            router.push("/orders/change");
          }}
        />

        <div className="min-h-screen bg-background flex flex-col justify-between pb-16 pt-2">
          <section className="gap-4 text-center text-base text-black font-inter px-4">
            <div className="font-semibold text-xl">Поиск заказа</div>

            <div className="flex flex-row gap-4 mt-12">
              <Image
                src="/images/edit-icon-dark.png"
                alt="Attatch Link Icon"
                height={"24"}
                width={"24"}
              />
              <input
                className="w-full border-b outline-none text-base bg-transparent text-dark-text flex-1"
                placeholder="Обновление заказа"
                type="text"
                id="text"
              />
            </div>
            <div className="w-full mt-6 flex items-center justify-center">
              <label
                htmlFor="image"
                className="cursor-pointer w-[90%] py-4 pr-5 pl-3 bg-purple-light rounded-2xl flex justify-center text-white font-medium hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <img
                  className="h-6 w-6 mr-2"
                  alt="Attach image"
                  src="/images/attachLink-icon.png"
                />
                <span>Прикрепить фото</span>
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </label>
            </div>
            <div className="w-full mt-6 flex items-center justify-center">
              <div
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
                  isFinished ? "bg-blue-600" : "bg-gray-200"
                }`}
                onClick={() => setIsFinished(!isFinished)}
              >
                <div
                  className={`transform transition-transform duration-500 ease-in-out ${
                    isFinished ? "translate-x-6" : "translate-x-0"
                  } bg-white w-6 h-6 rounded-full shadow-md`}
                />
              </div>
              <span className="ml-3 text-gray-700 font-medium">
                Завершено?
              </span>
            </div>
            {imageSrc && imageFile && (
              <div className="relative flex flex-row justify-center mt-10">
                <div className="relative">
                  <Image
                    src={imageSrc}
                    alt="Image"
                    id="uploaded-image"
                    className="border rounded-2xl"
                    height={170}
                    width={170}
                  />
                  <img
                    src="/images/cross-icon-white.png"
                    className="cursor-pointer absolute top-0 right-0 p-1 rounded-full"
                    onClick={() => {
                      setImageSrc(null);
                      setImageFile(null);
                    }}
                  />
                </div>
              </div>
            )}
          </section>

          <MainButton
            progress={showProgress}
            color="#6543bc"
            text="Обновить заказ"
            onClick={changeProductHistory}
          />
        </div>
      </div>
    </>
  );
};

export default CreateChangeHistory;
