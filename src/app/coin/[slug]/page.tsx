import { CoinPage } from "@/components/component/coin-page";

export default function Page({ params }: { params: { slug: string } }) {
  return <CoinPage slug={params.slug} />;
}
