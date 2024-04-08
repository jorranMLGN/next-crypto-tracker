import Image from "next/image";
import Link from "next/link";
import { Dashboard } from "@/components/component/dashboard";
import { ToastProvider } from "@/components/ui/toast";
import { Toaster } from "@/components/ui/toaster";

function Card({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      rel="noopener noreferrer nofollow"
      target="_blank"
      className="flex items-center justify-center"
    >
      <div
        className="h-48 w-full gap-x-8 rounded-xl border p-6 text-left shadow-xl transition-all hover:scale-[102%] hover:bg-border/25"
        style={{
          display: "grid",
          gridTemplateAreas: '"title icon" "description icon"',
        }}
      >
        {children}
      </div>
    </Link>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="flex scroll-m-20 items-end text-3xl font-extrabold tracking-tight lg:text-4xl"
      style={{
        gridArea: "title",
      }}
    >
      {children}
    </h1>
  );
}

function CardDescription({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-4 text-gray-500"
      style={{
        gridArea: "description",
      }}
    >
      {children}
    </p>
  );
}

function CardIcon({ src, className }: { src: string; className?: string }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        gridArea: "icon",
      }}
    >
      <Image
        src={src}
        width={64}
        height={64}
        alt="Card logo"
        className={className}
      />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <main className="p-4">
        <Dashboard />
      </main>
      <Toaster />
    </>
  );
}
