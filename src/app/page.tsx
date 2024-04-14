"use client";
import { Toaster } from "@/components/ui/toaster";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { JSX, SVGProps, useEffect, useRef, useState } from "react";
import CardPlate from "@/components/CardPlate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CoinType } from "@/lib/types";
import { CoinRow } from "@/components/component/CoinRow";
import useItemOnScreen from "@/hooks/useItemOnScreen";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityLogIcon } from "@radix-ui/react-icons";
import useCoins from "@/src/providers/CoinContext";

export default function Page() {
  const [coinList, setCoinList] = useState<CoinType[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { coins } = useCoins();

  const loadMore = () => {
    setCoinList(coins.filter((coin, index) => index < coinList.length + 10));
  };

  useEffect(() => {
    setCoinList(coins.filter((coin, index) => index < 10));
  }, []);

  useItemOnScreen(bottomRef, loadMore as any, { threshold: 1 });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-4 md:p-8">
      <div className="grid">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>
                <span className="flex flex-row items-center gap-2 text-4xl">
                  <ActivityIcon className="h-6 w-6 text-blue-500" />
                  Dashboard
                </span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <span className="flex flex-row items-center gap-2">
                Wallet Balance
              </span>
              <span className="flex items-center text-2xl font-bold ">
                <DollarSignIcon className="h-6 w-6 text-green-500" />
                3,200
              </span>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>
                Available Coins
                <Badge variant="outline">{coins.length}&nbsp;Coins</Badge>
              </CardTitle>
              <CardDescription>
                List of all available coins, sorted by popularity.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className={" overflow-x-auto"}>
            <Table>
              <TableCaption ref={bottomRef}>
                <Skeleton />
              </TableCaption>
              <TableHeader className={"w-full"}>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Coin</TableHead>
                  <TableHead>Supply</TableHead>
                  <TableHead>
                    Changed <Badge variant="outline">24h</Badge>
                  </TableHead>

                  <TableHead>
                    Price&nbsp;<Badge variant="outline">USD</Badge>
                  </TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {coinList &&
                  coinList.map((coin, index) => (
                    <CoinRow key={index} {...coin} />
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>
                <div className="flex flex-row items-center gap-1.5 text-xl">
                  <ActivityLogIcon className="h-3.5 w-3.5 text-red-500" />
                  Live Activity
                </div>
              </CardTitle>
              <CardDescription>
                Follow current activity in real-time.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <CardPlate coin={coins[0]} />
              <CardPlate coin={coins[1]} />
              <CardPlate coin={coins[2]} />
              <CardPlate coin={coins[3]} />
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </main>
  );
}

function DollarSignIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function ActivityIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
