import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JSX, SVGProps } from "react";

function ArrowUpRightIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export const CoinRow = ({ ...dataCoin }) => {
  return (
    <TableRow>
      <TableCell>
        <div className="text-2xl font-medium capitalize">{dataCoin["id"]}</div>
        <div className="hidden text-sm text-gray-500 dark:text-gray-400 md:inline">
          {dataCoin["name"]}
        </div>
      </TableCell>
      <TableCell>
        <Badge className="text-xs" variant="outline">
          {dataCoin["rank"]}
        </Badge>
      </TableCell>
      <TableCell>{dataCoin["supply"]}</TableCell>
      <TableCell className="text-right text-lg">
        $ {dataCoin["priceUsd"]}
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
