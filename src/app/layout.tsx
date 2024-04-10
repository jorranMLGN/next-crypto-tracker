import "@/styles/globals.scss";
import { Inter } from "next/font/google";

import { ReactNode } from "react";
import AssetSocketContext from "@/lib/AssetSocketContext";
import Dashboard from "@/components/dashboard";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <AssetSocketContext>
        <body className={inter.className}>
          <Dashboard>{children}</Dashboard>
        </body>
      </AssetSocketContext>
    </html>
  );
}
