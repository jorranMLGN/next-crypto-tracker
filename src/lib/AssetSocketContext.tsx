"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { CoinType } from "@/lib/types";
import { getRequestCoinList } from "@/lib/utils";

interface Coin {
  [coin: string]: number;
}

export const AssetSocketContext = createContext<Coin>({});

export default function AssetData({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Coin>({});
  const [dataValue, setDataValue] = useState<CoinType>();

  useEffect(() => {
    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=ALL");

    ws.onopen = () => {
      console.log("Connected to the server");
    };

    ws.onmessage = (message) => {
      const JSONData = JSON.parse(message.data);
      Object.entries(JSONData).forEach(([coin, price]) => {
        let priceBuffer: number = parseFloat(price as string);

        setData((prevData) => {
          return { ...prevData, [coin]: priceBuffer };
        });
      });
    };

    ws.onclose = () => {
      console.log("Disconnected from the server");
    };
  }, []);

  useEffect(() => {
    getRequestCoinList().then((data: any) => {
      setDataValue(data["data"]);
      console.log(data, "useEffect data");
    });
  }, []);

  return (
    <AssetSocketContext.Provider value={data}>
      {children}
    </AssetSocketContext.Provider>
  );
}
