import "../styles/globals.css";
// import axios from 'axios';
import type { AppProps } from "next/app";
// import { useEffect, useState } from 'react';
import { Provider } from "jotai";

// TODO: Enable hash validation to prevent unauthorized access to the app
//       or request proxying and spoofing.
function LogisticMix({ Component, pageProps }: AppProps) {
  // const [isHashValid, setIsHashValid] = useState(false);

  // Wait for validation to complete before rendering the page and stop the
  // rendering if the hash is invalid.
  // useEffect(() => {
  //   axios
  //     .post('/api/validate-hash', { hash: window.Telegram.WebApp.initData })
  //     .then((response) => setIsHashValid(response.status === 200));
  // }, []);

  // if (!isHashValid) {
  //   return null;
  // }

  return (
    <>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default LogisticMix;
