import CoinPage from "../page";

export default function Page({ params }: { params: { slug: string } }) {
  return <CoinPage params={params} />;
}
