"use client";
import { useToast } from "@/components/ui/use-toast";
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
import { ReactNode } from "react";
import {
  MenuIcon,
  Package2Icon,
  SearchIcon,
  UserCircleIcon,
} from "@/public/Icons";

export default function Dashboard({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white px-4 dark:bg-gray-950 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            href="#"
          >
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            className="text-gray-950 transition-colors hover:text-gray-950 dark:text-gray-50 dark:hover:text-gray-50"
            href="#"
          >
            Dashboard
          </Link>
          <Link
            className="text-gray-500 transition-colors hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            Charts
          </Link>
          <Link
            className="text-gray-500 transition-colors hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            Favorites
          </Link>
          <Link
            className="text-gray-500 transition-colors hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            Customers
          </Link>
          <Link
            className="text-gray-500 transition-colors hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
            href="#"
          >
            Analytics
          </Link>
          <Button
            onClick={() => {
              toast({
                title: "Create",
                description: "Create a new product",
              });
            }}
            size="sm"
          >
            Create
          </Button>
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
                href="#"
              >
                <Package2Icon className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                className="hover:text-gray-950 dark:hover:text-gray-50"
                href="#"
              >
                Dashboard
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                Orders
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                Products
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                Customers
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Search products..."
                type="search"
              />
            </div>
          </form>
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
