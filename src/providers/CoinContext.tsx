"use client";
import { CoinType } from "@/lib/types";
import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import useSWR from "swr";

export interface CoinContextValues {
  coins: CoinType[];
  setCoins: Dispatch<SetStateAction<CoinType[]>>;
}

export const CoinContext = createContext<CoinContextValues>(
  {} as CoinContextValues
);

interface CoinProviderProps {
  children: ReactNode;
}
export const CoinProvider: FC<CoinProviderProps> = ({ children }) => {
  const [coins, setCoins] = useState<CoinType[]>([]);

  const fetcher = useCallback(
    (...args: Parameters<typeof fetch>) =>
      fetch(...args).then((res) => {
        return res.json();
      }),
    []
  );
  const { data, error, isLoading } = useSWR(
    "https://api.coincap.io/v2/assets?limit=100",
    fetcher,
    { refreshInterval: 2000 }
  );
  useEffect(() => {
    if (data) {
      setCoins(data.data);
    }
  }, [data, error, isLoading, setCoins, fetcher, data?.data]);

  return (
    <CoinContext.Provider value={{ coins, setCoins }}>
      {children}
    </CoinContext.Provider>
  );
};

export default function useCoins() {
  return useContext(CoinContext);
}
