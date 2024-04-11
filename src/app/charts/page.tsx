"use client";
import CryptoChart from "@/components/component/Charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useContext } from "react";
import { CoinContext } from "@/src/providers/CoinContext";

export default function Page() {
  let { coins } = useContext(CoinContext);
  const coinList = coins?.slice(0, 10);
  return (
    <main className="flex h-2/3 sm:px-6 sm:py-0 md:gap-8">
      <CryptoChart />
    </main>
  );
}
