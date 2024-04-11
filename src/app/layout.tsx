import "@/styles/globals.scss";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { CoinProvider } from "@/src/providers/CoinContext";
import Dashboard from "@/components/dashboard";
import { RecoilProvider } from "@/src/providers/RecoilProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <RecoilProvider>
        <CoinProvider>
          <body className={inter.className}>
            <Dashboard>{children}</Dashboard>
          </body>
        </CoinProvider>
      </RecoilProvider>
    </html>
  );
}
