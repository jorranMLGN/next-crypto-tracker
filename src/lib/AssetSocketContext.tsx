"use client";
import { createContext, ReactNode, useEffect, useState } from "react";

interface Coin {
  [coin: string]: number;
}

export const AssetSocketContext = createContext<Coin>({});

export default function AssetData({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Coin>({});
  let CoinList: string[] = [];

  useEffect(() => {
    console.log(data);
  }, [data]);
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

  return (
    <AssetSocketContext.Provider value={data}>
      {children}
    </AssetSocketContext.Provider>
  );
}
