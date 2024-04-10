import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSignIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AssetSocketContext } from "@/lib/AssetSocketContext";
import { getRequestDailyChange } from "@/lib/utils";
import { Router, useRouter } from "next/router";
import Link from "next/link";

export default function CardPlate({
  token,
  title,
  description,
  href,
}: {
  token: string;
  title?: string;
  description?: string;
  href?: string;
}) {
  const [priceDayChange, setPriceDayChange] = useState("");
  const data = useContext(AssetSocketContext);

  useEffect(() => {
    getRequestDailyChange(token).then((data: any) => {
      console.log(data);
      const priceDayChange = data["data"]["changePercent24Hr"];

      setPriceDayChange(
        Math.floor(priceDayChange * 100) / 100 + "%" || "Loading..."
      );
    });
  }, [token]);

  return (
    <Card className="cursor-pointer" x-chunk="dashboard-01-chunk-0">
      <Link href={href || `/coin/${token}`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium capitalize">
            {title || token}
          </CardTitle>
          <DollarSignIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            $&nbsp;{data[token] || "Loading..."}
          </div>
          <p
            className="text-xs text-gray-500 dark:text-gray-400"
            style={{
              color: priceDayChange.includes("-") ? "indianred" : "green",
            }}
          >
            {priceDayChange || "Loading..."}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}
