import CallToAction from "../components/CallToAction";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import TopDoctors from "../components/TopDoctors";

export default function Home() {
  return (
    <section className="relative">
      <Navbar />
      <Hero />
      <TopDoctors />
      <CallToAction />
      <Footer />
    </section>
  );
}
