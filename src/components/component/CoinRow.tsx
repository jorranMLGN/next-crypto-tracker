import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JSX, SVGProps, useState } from "react";
import { ArrowUpRightIcon } from "@/public/Icons";
import { CoinType } from "@/lib/types";

export const CoinRow = (dataCoin: CoinType) => {
  const priceDayChange =
    Math.floor(parseFloat(dataCoin["changePercent24Hr"]) * 100) / 100;

  return (
    <TableRow>
      <TableCell>
        <Badge className="text-xs" variant="outline">
          {dataCoin["rank"]}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="text-2xl font-medium capitalize">{dataCoin["id"]}</div>
        <div className="hidden text-sm text-gray-500 dark:text-gray-400 md:inline">
          {dataCoin["name"]}
        </div>
      </TableCell>
      <TableCell>
        {dataCoin["supply"].length > 10
          ? dataCoin["supply"].split(".")[0]
          : dataCoin["supply"]}
      </TableCell>
      <TableCell>
        <p
          style={{
            color: priceDayChange < 0 ? "red" : "green",
          }}
        >
          {priceDayChange > 0 && "+"}
          {priceDayChange || "Loading..."}%
        </p>
      </TableCell>
      <TableCell className="text-lg">
        $&nbsp;
        {dataCoin.priceUsd.toString().length > 10
          ? dataCoin.priceUsd.toString().slice(0, 10)
          : dataCoin.priceUsd}
      </TableCell>
      <TableCell className={""}>
        <Button variant={"ghost"} asChild className="my-auto gap-1" size="sm">
          <Link
            href={`/coin/${dataCoin["id"]}
          `}
          >
            View
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
  );
};
