import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { LuLoader } from "react-icons/lu";
import { CoinType } from "@/lib/types";

export default function CardPlate({ coin }: { coin?: CoinType | undefined }) {
  const [priceDayChange, setPriceDayChange] = useState("Loading...");

  useEffect(() => {
    if (coin) {
      setPriceDayChange(coin.changePercent24Hr);
    }
  }, [coin]);

  // Check if content is loading
  if (!coin?.id) {
    return (
      <Card className="cursor-pointer" x-chunk="dashboard-01-chunk-0">
        <Skeleton className="h-28" />
      </Card>
    );
  }

  return (
    <Card className="cursor-pointer" x-chunk="dashboard-01-chunk-0">
      <Link href={`/coin/${coin?.id}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">
            {coin?.name || coin?.id || "Loading..."}
          </CardTitle>
          <Image
            src={`https://raw.githubusercontent.com/ErikThiart/cryptocurrency-icons/master/16/${coin?.id}.png`}
            alt={coin?.name || coin?.id || "Loading..."}
            width={16}
            height={16}
          />
        </CardHeader>
        <CardContent>
          <span className="flex items-center text-2xl font-bold">
            $&nbsp;
            {coin?.priceUsd || (
              <LuLoader className={"animate-spin ease-in-out"} />
            )}
          </span>
          <p
            className="text-xs text-gray-500 dark:text-gray-400"
            style={{
              color: priceDayChange.includes("-") ? "red" : "green",
            }}
          >
            {priceDayChange}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}
