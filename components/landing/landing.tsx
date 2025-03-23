import Footer from "./footer";
import Features from "./features";
import Hero from "./hero";

export default function Landing() {
  return (
    <div className="pb-10 lg:pb-20 pt-[70px]">
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
