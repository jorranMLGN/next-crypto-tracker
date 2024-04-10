"use client";
import { Toaster } from "@/components/ui/toaster";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  TableCaption,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  JSX,
  ReactNode,
  SetStateAction,
  SVGProps,
  useEffect,
  useRef,
  useState,
} from "react";
import CardPlate from "@/components/CardPlate";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRequestCoinList } from "@/lib/utils";
import { CoinType } from "@/lib/types";
import { CoinRow } from "@/components/component/CoinRow";
import useItemOnScreen from "@/hooks/useItemOnScreen";
import { Skeleton } from "@/components/ui/skeleton";

const CoinDifference = ({ ...dataCoin }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {dataCoin["name"]}
        </CardTitle>
        <DollarSignIcon className="h-4 w-4 text-green-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+5.5%</div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          +$3,200 since last hour
        </p>
      </CardContent>
    </Card>
  );
};
export default function Page() {
  const [list, setList] = useState<CoinType[]>([]);
  const [CoinList, setCoinList] = useState<CoinType[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getRequestCoinList().then((data: any) => {
      setCoinList(data["data"]);
      setList(CoinList.filter((coin, index) => index < 10));
      console.log(CoinList, "data");
    });
  }, []);

  const loadMore = () => {
    setList(CoinList.filter((coin, index) => index < list.length + 10));
  };

  useItemOnScreen(bottomRef, loadMore as any, { threshold: 1 });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <CardPlate token={"bitcoin"} />
        <CardPlate token={"ethereum"} />
        <CardPlate token={"litecoin"} />
        <CardPlate token={"xrp"} />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>
                Available Coins
                <Badge variant="outline">{CoinList.length} Coins</Badge>
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
                  <TableHead>Coin</TableHead>
                  <TableHead>Rank</TableHead>
                  <TableHead>Supply</TableHead>
                  <TableHead>
                    Price&nbsp;<Badge variant="outline">USD</Badge>
                  </TableHead>
                  <TableHead className={"text-center"}>Go to</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {list && list.map((coin) => <CoinRow {...coin} />)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle className={"flex gap-2"}>
              Biggest Changes<Badge variant="outline">24h</Badge>
            </CardTitle>
          </CardHeader>
          {/*Display the biggest changes in the last 24 hours.*/}
          <CardContent className="grid gap-8">
            <CoinDifference />
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
