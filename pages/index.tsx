import Hero from "@/components/general/Hero";
import RootLayout from "@/components/Layout/RootLayout";

export default function Home() {
  return (
    <RootLayout>
      <Hero />
    </RootLayout>
  );
}
Home.showBanner = true;
