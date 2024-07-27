import axios from "axios";
import * as dotenv from "dotenv";
import { useAtom } from "jotai";
import Head from "next/head";
import { useEffect, useState } from "react";

import { IGetProductResponse, IProduct } from "@/types";

import ProductComponent from "@/Components/Index/IndividualProduct";
import ManagerHeaders from "@/Components/Index/ManagerHeaders";
import UserHeader from "@/Components/Index/UserHeader";

import { authAtom, productsAtom, sessionAtom } from "@/state/atoms";
import { useRouter } from "next/router";

dotenv.config({
  path: "../../.env.local",
});

const Home = ({ initialProducts }: { initialProducts: IProduct[] }) => {
  const [jwt, setJWT] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [auth, setAuth] = useAtom(authAtom);
  const [products, setProducts] = useAtom(productsAtom);
  const [session, setSession] = useAtom(sessionAtom);

  const [currentProducts, setCurrentProducts] = useState<IProduct[]>([]);

  const router = useRouter();

  async function handleAuth(initString: string) {
    try {
      let request = await axios.post<{ token: string }>(
        `https://logmix.asap-it.tech/api/login`,
        {
          data: initString,
        }
      );
      var jwt = request.data.token;
      if (!jwt) return { jwt: null, isAdmin: false };

      var response = await axios.get<{ is_admin: boolean }>(
        `https://logmix.asap-it.tech/api/check-auth`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setJWT(jwt);
      setIsAdmin(response.data.is_admin);
      return { jwt, isAdmin: response.data.is_admin };
    } catch (error) {
      return { jwt: null, isAdmin: false };
    }
  }

  useEffect(() => {
    if (!window.Telegram.WebApp.isExpanded) {
      window.Telegram.WebApp.expand();
    }
    const initString = window.Telegram.WebApp.initData;

    // only handle auth if we don't have a jwt
    if (!auth.jwt) {
      handleAuth(initString).then((res) => {
        setAuth({
          jwt: res?.jwt,
          isAdmin: res?.isAdmin,
        });
      });
    }

    setSession({
      hasMore: true,
      loading: false,
      page: 1,
    });

    setProducts(initialProducts);
    setCurrentProducts(initialProducts);
  }, [jwt, isAdmin, initialProducts]);

  const loadMoreProducts = () => {
    if (session.loading) return;
    if (!session.hasMore) return;

    const newPage = session.page + 1;

    fetchProducts(newPage)
      .then((newProducts) => {
        setProducts((prev) => {
          const productIds = new Set(prev.map((product) => product.id));
          const uniqueProducts = newProducts.filter(
            (product) => !productIds.has(product.id)
          );
          return [...prev, ...uniqueProducts];
        });
        setSession({
          hasMore: newProducts.length > 0,
          loading: false,
          page: newPage,
        });
      })
      .finally(() => {
        setSession((prev) => ({
          ...prev,
          loading: false,
        }));
      });
  };

  const searchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    var search = e.target.value;
    var filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(search.toLowerCase());
    });
    setCurrentProducts(filteredProducts);
  };

  if (!auth.jwt) {
    return <div>Аутентификация...</div>;
  }

  return (
    <div>
      <Head>
        <title>Логистический миксбот</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full relative bg-background overflow-hidden flex flex-col items-center justify-start pt-[0rem] px-[0rem] pb-[1rem] box-border text-center text-[1rem] text-black font-inter">
        {auth.isAdmin ? (
          <ManagerHeaders onSearchBoxChange={searchProduct} />
        ) : (
          <UserHeader onSearchBoxChange={searchProduct} />
        )}

        <div className="grid grid-cols-2 cursor-pointer gap-2">
          {currentProducts.map((product) => (
            <ProductComponent
              key={product.id}
              id={product.id}
              itemImg={product.preview_image}
              itemName={product.title}
              itemPrice={product.price}
              onClick={() => {
                router.push(`/products/${product.id}?jwt=${auth.jwt}`);
              }}
            />
          ))}
        </div>
        {session.loading && <p>Loading...</p>}
        {!session.loading && session.hasMore && (
          <button onClick={loadMoreProducts} className="py-5">
            Загружайте больше продуктов.
          </button>
        )}
      </div>
    </div>
  );
};

async function fetchProducts(page: number, limit: number = 10) {
  try {
    const response = await axios.get<IGetProductResponse>(
      `https://logmix.asap-it.tech/api/products?page=${page}&limit=${limit}`
    );
    return response.data.products;
  } catch {
    return [];
  }
}

export const getServerSideProps = async () => {
  const products = await fetchProducts(1);
  return { props: { initialProducts: products } };
};

export default Home;
