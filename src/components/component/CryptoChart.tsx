import { useContext, useEffect, useState } from "react";
import { CoinContext } from "@/src/providers/CoinContext";
import { CoinType } from "@/lib/types";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import { LuLoader } from "react-icons/lu";

ChartJS.register(ArcElement, Tooltip, Legend);

const CryptoChart = () => {
  const { coins } = useContext(CoinContext);
  const [chartData, setChartData] = useState<any>();
  const [coinList, setCoinList] = useState<CoinType[]>([]);

  useEffect(() => {
    if (coins) {
      setCoinList(coins.splice(0, 10));
      const labels = coinList.map((coin) => coin.name);
      const values = coinList.map((coin) => coin.marketCapUsd);

      setChartData({
        labels,
        datasets: [
          {
            label: "Market Cap (USD)",
            data: values,
            backgroundColor: "rgba(83,227,227,0.2)",
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, [coins]);

  if (!chartData) {
    return <LuLoader className={"m-auto h-32 w-32 animate-spin ease-in-out"} />;
  }

  return (
    <Card className={"flex h-2/3 w-full flex-row gap-8 p-8"}>
      <CardHeader className="flex flex-row items-center ">
        <div className="grid gap-2">
          <CardTitle>Market Cap</CardTitle>
          <CardDescription>Current top 10</CardDescription>
          <CardDescription className={"flex flex-col"}>
            {coinList.map((coin) => (
              <span key={coin.id}>* {coin.name}</span>
            ))}
          </CardDescription>
        </div>
      </CardHeader>
      <div className="flex w-3/4 justify-center">
        {isNaN(chartData.datasets[0].data[0]) ? (
          <LuLoader
            className={"h-32 w-32 animate-spin self-center ease-in-out"}
          />
        ) : (
          <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              normalized: true,
              animations: {
                tension: {
                  duration: 1000,
                  easing: "easeInOutBack",
                  from: 1,
                  to: 0,
                  loop: true,
                },
              },
            }}
          />
        )}
      </div>
    </Card>
  );
};

export default CryptoChart;
