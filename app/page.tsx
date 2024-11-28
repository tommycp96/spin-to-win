import { Metadata } from "next";
import SpinToWin from "./spin-to-win";

export const metadata: Metadata = {
  title: "Spin to Win - Name Selector",
  description: "A fun and interactive way to randomly select names from a list",
  openGraph: {
    title: "Spin to Win - Name Selector",
    description: "A fun and interactive way to randomly select names from a list",
    type: "website",
  },
};

export default function Home() {
  return <SpinToWin />;
}