import { atom } from "recoil";
import { CoinType } from "@/lib/types";
const localStorageEffect =
  (key: any) =>
  ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const favoriteListState = atom({
  key: "favoriteListState",
  default: [] as CoinType[],
  effects: [localStorageEffect("favorites")],
});
