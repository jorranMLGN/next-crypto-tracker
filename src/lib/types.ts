export interface CoinType {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string | number;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}
