"use client";
import useCoins from "@/src/providers/CoinContext";
import { useRecoilState } from "recoil";
import { favoriteListState } from "@/src/store/atoms/favoriteAtom";
import { CoinType } from "@/lib/types";

export default function Page() {
  let { coins } = useCoins();
  const [favorites, setFavorites] = useRecoilState(favoriteListState);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div>
          Test to see if the favorites are being stored in local storage
        </div>
        <div>
          {favorites.map((coin: CoinType) => (
            <div key={coin.id}>{coin.name}</div>
          ))}

          {coins.map((coin) => (
            <button
              onClick={() => {
                setFavorites([...favorites, coin]);
              }}
            >
              Add {coin.name} to favorites
            </button>
          ))}

          <button
            onClick={() => {
              setFavorites([]);
            }}
          >
            Clear favorites
          </button>
        </div>
      </div>
    </main>
  );
}
