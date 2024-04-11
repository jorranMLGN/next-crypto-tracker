// components/CryptoChart.js
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useContext } from "react";
import { CoinContext } from "@/src/providers/CoinContext";
import { CoinType } from "@/lib/types";

const CryptoChart = () => {
  const { coins } = useContext(CoinContext);
  const [chartData, setChartData] = useState<any>({});
  const [coinList, setCoinList] = useState<CoinType[]>(coins);

  useEffect(() => {
    setCoinList(coins.splice(0, 10));

    const labels = coinList.map((coin) => coin.name);
    const values = coinList.map((coin) => coin.marketCapUsd);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Market Cap (USD)",
          data: values,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [coins]);

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default CryptoChart;
