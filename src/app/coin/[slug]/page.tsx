"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import Overview from "@/components/OverviewChart";
import useCoins from "@/src/providers/CoinContext";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { CoinType } from "@/lib/types";
import { LuLoader } from "react-icons/lu";
import { StarIcon, UploadIcon } from "@/public/Icons";
import { ChevronLeftIcon, PlusCircleIcon } from "lucide-react";
import { useRecoilState } from "recoil";
import { favoriteListState } from "@/src/store/atoms/favoriteAtom";

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  let { coins } = useCoins();
  const [loading, setLoading] = useState(true); // Add this line
  const [buyAmount, setBuyAmount] = useState(0);
  const [currentCoin, setCurrentCoin] = useState<CoinType | undefined>(
    coins.find((coin) => coin.id.toLowerCase() === slug.toLowerCase())
  );

  const [favorites, setFavorites] = useRecoilState(favoriteListState);

  const addToFavoritesLocal = (coinToAdd: CoinType) => {
    setFavorites([...favorites, coinToAdd] as any);
    toast({
      title: "Added to favorites",
      description: `You have Added ${coinToAdd.name} To your favorites`,
      duration: 5000,
    });
  };

  const removeFromFavoritesLocal = (coinToRemove: CoinType) => {
    setFavorites(
      favorites.filter((coin: CoinType) => coin.id !== coinToRemove.id)
    );
    toast({
      title: "Removed from favorites",
      description: `You have removed ${coinToRemove.name} from your favorites`,
      duration: 3000,
    });
  };

  const isFavorite = (coin: CoinType) => {
    let id = coin.id;
    return favorites.map((coin) => coin.id).includes(id);
  };

  useEffect(() => {
    setCurrentCoin(
      coins.find((coin) => coin.id.toLowerCase() === slug.toLowerCase())
    );

    console.log(coins);
    setLoading(false); // Add this line
  }, [coins]);

  if (!currentCoin || !currentCoin.id || loading) {
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
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Toaster />
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => window.history.back()}
            className="h-7 w-7"
            size="icon"
            variant="outline"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-4xl font-semibold tracking-tight sm:grow-0">
            {currentCoin?.name || "Coin not found"}
          </h1>

          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button
              className="flex items-center justify-end gap-1 transition-all active:scale-95"
              onClick={() => {
                favorites.map((coin) => coin.id).includes(currentCoin?.id)
                  ? removeFromFavoritesLocal(currentCoin as CoinType)
                  : addToFavoritesLocal(currentCoin as CoinType);
              }}
              size="sm"
              variant={isFavorite(currentCoin) ? "outline" : "default"}
              color={isFavorite(currentCoin) ? "yellow" : "gray"}
            >
              <StarIcon />
              {isFavorite(currentCoin)
                ? "Remove favorites"
                : "Add to favorites"}
            </Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-0">
              <CardHeader>
                <CardTitle>Coin Details</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label className="capitalize" htmlFor="name">
                      Buy&nbsp;{currentCoin?.name}
                    </Label>
                    <Input
                      onChange={(e) => setBuyAmount(parseFloat(e.target.value))}
                      className="w-full"
                      defaultValue="0"
                      id="amount"
                      min={0}
                      step="0.00001"
                      type="number"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Total Cost $</Label>
                    <Input
                      className="w-fit"
                      defaultValue="0.00"
                      value={(
                        buyAmount * (currentCoin?.priceUsd as number)
                      ).toFixed(2)}
                      id="total-cost"
                      readOnly
                      type="number"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>{currentCoin?.name} Overview</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Overview />
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button className="gap-1" size="sm" variant="ghost">
                  <PlusCircleIcon className="h-3.5 w-3.5" />
                  Add Variant
                </Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-07-chunk-2">
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger aria-label="Select category" id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="subcategory">Subcategory (optional)</Label>
                    <Select>
                      <SelectTrigger
                        aria-label="Select subcategory"
                        id="subcategory"
                      >
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="t-shirts">T-Shirts</SelectItem>
                        <SelectItem value="hoodies">Hoodies</SelectItem>
                        <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>{currentCoin?.name}&nbsp;Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label>{currentCoin?.name}&nbsp;Price</Label>
                    <p className="text-2xl font-bold">
                      $&nbsp;
                      {parseFloat(currentCoin?.priceUsd as string).toFixed(8) ||
                        0}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <img
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src="/placeholder.svg"
                    width="300"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <button>
                      <img
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/placeholder.svg"
                        width="84"
                      />
                    </button>
                    <button>
                      <img
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/placeholder.svg"
                        width="84"
                      />
                    </button>
                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed border-gray-200 dark:border-gray-800">
                      <UploadIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="sr-only">Upload</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-5">
              <CardHeader>
                <CardTitle>Archive Product</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div />
                <Button size="sm" variant="secondary">
                  Archive Product
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
