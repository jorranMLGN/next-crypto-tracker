"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { ReactNode, useContext, useEffect, useState } from "react";
import {
  MenuIcon,
  Package2Icon,
  SearchIcon,
  UserCircleIcon,
} from "@/public/Icons";
import { CoinContext } from "@/src/providers/CoinContext";
import { CoinType } from "@/lib/types";

export default function Dashboard({ children }: { children: ReactNode }) {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([] as CoinType[]);
  const { coins } = useContext(CoinContext);

  useEffect(() => {
    if (search.length < 1) {
      setSearchResults([]);
      return;
    }
    const results = coins.filter((coin) => {
      return (
        coin.symbol.toLowerCase().includes(search.toLowerCase()) ||
        coin.name.toLowerCase().includes(search.toLowerCase())
      );
    });

    console.log(results);
    setSearchResults(results);
  }, [search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white px-4 dark:bg-gray-950 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            href="/"
          >
            <Package2Icon className="h-6 w-6" />
          </Link>
          <Link
            className="text-gray-950 transition-colors hover:text-gray-950 dark:text-gray-50 dark:hover:text-gray-50"
            href="/"
          >
            Dashboard
          </Link>
          <Link
            className="text-gray-500 transition-colors hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
            href="/charts"
          >
            Charts
          </Link>
          <Link
            className="text-gray-500 transition-colors hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
            href="/favorites"
          >
            Favorites
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="shrink-0 md:hidden"
              size="icon"
              variant="outline"
            >
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                className="flex items-center gap-2 text-lg font-semibold"
                href="/"
              >
                <Package2Icon className="h-6 w-6" />
              </Link>
              <Link
                className="hover:text-gray-950 dark:hover:text-gray-50"
                href="/"
              >
                Dashboard
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                href="/charts"
              >
                Charts
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                href="/favorites"
              >
                Favorites
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Search products..."
                value={search}
                onChange={(e) => handleSearch(e)}
                type="search"
              />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute top-full z-50 mt-2 max-h-[300px] overflow-y-auto   rounded-md border border-accent bg-background shadow-lg">
                {searchResults
                  .slice(
                    0,
                    searchResults.length > 30 ? 30 : searchResults.length
                  )
                  .map((coin) => (
                    <Link
                      key={coin.id}
                      href={`/coin/${coin.id}`}
                      className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <div className="flex items-center gap-2">
                        <span>{coin.name}</span>
                        <span className="text-gray-500">{coin.symbol}</span>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="secondary">
                <UserCircleIcon className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">{children}</main>
    </div>
  );
}
