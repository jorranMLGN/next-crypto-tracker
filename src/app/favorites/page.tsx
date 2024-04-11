"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import useCoins from "@/src/providers/CoinContext";
import { Toaster } from "@/components/ui/toaster";
import { LuLoader } from "react-icons/lu";
import { ChevronLeftIcon, XIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CoinType } from "@/lib/types";
import { toast } from "@/components/ui/use-toast";
import { useRecoilState } from "recoil";
import { favoriteListState } from "@/src/store/atoms/favoriteAtom";

export default function Page() {
  let { coins } = useCoins();
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useRecoilState(favoriteListState);

  const removeFromFavoritesLocal = (coin: CoinType) => {
    let newFavorites = favorites.filter((favorite) => favorite.id !== coin.id);
    setFavorites(newFavorites);
  };

  useEffect(() => {
    if (coins.length === 0) return;
    if (loading) return;
    toast({
      title: "Favorites Changed!",
      description: `You have Removed your favorites!`,
      duration: 3000,
    });
  }, [favorites]);

  useEffect(() => {
    console.log(coins);
    setLoading(false); // Add this line
  }, [coins]);

  if (loading) {
    return (
      <main className="grid flex-1 items-start gap-4 p-4  sm:py-0 md:gap-8">
        <Toaster />
        <Button
          onClick={() => window.open("/", "_self")}
          className="h-12 w-12 rounded-xl"
          size="icon"
          variant="outline"
        >
          <ChevronLeftIcon className="h-16 w-16" />
          <span className="sr-only">Back</span>
        </Button>
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <LuLoader className="h-32 w-32 animate-spin ease-in-out" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="">
      <Toaster />
      <div className="mx-auto flex w-full flex-1">
        <Card className={"w-max min-w-full"} title={"Favorites"}>
          <Table className={"w-full"}>
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
              {favorites.length > 0 ? (
                favorites.map((coin: CoinType) => (
                  <TableRow key={coin.id}>
                    <TableHead>{coin.rank}</TableHead>
                    <TableHead>{coin.name}</TableHead>
                    <TableHead>{coin.supply}</TableHead>
                    <TableHead>{coin.changePercent24Hr}</TableHead>
                    <TableHead>{coin.priceUsd}</TableHead>
                    <TableHead>
                      <Button
                        variant={"outline"}
                        onClick={() => {
                          removeFromFavoritesLocal(coin);
                        }}
                        className={"flex gap-1"}
                        size="icon"
                      >
                        <div className={"p-2"}>
                          <XIcon size={24} scale={1.5} />
                        </div>
                      </Button>
                    </TableHead>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableHead colSpan={6} className={"text-center"}>
                    No Favorites
                  </TableHead>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </main>
  );
}
