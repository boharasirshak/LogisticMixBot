import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const script = await axios.get(
      "https://telegram.org/js/telegram-web-app.js",
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/javascript");
    res.status(200).send(script.data);
  } catch (error) {
    console.error(error);
    res.status(500).end("Internal Server Error");
  }
}
