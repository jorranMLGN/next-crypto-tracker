import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { CoinType } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getRequestDailyChange(coin: string = "bitcoin") {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return await fetch(
    `https://api.coincap.io/v2/assets/${coin}`,
    requestOptions as RequestInit
  )
    .then((response) => response.text())
    .then((result) => {
      const JSONData = JSON.parse(result);

      return JSONData as { data: { changePercent24Hr: string } };
    })
    .catch((error) => console.error(error));
}

export async function getRequestCoinList() {
  return await axios
    .get("https://api.coincap.io/v2/assets?limit=2000")
    .then((response) => response.data as { data: CoinType[] })
    .catch((error) => console.error(error));
}

export async function getRequestCoin(coin: string = "bitcoin") {
  return await axios
    .get(`https://api.coincap.io/v2/assets/${coin}`)
    .then((response) => response.data as { data: CoinType })
    .catch((error) => console.error(error));
}

export async function getRequestCoinHistory(coin: string = "bitcoin") {
  return await axios
    .get(`https://api.coincap.io/v2/assets/${coin}/history`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
}
