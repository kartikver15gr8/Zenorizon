import Features from "./features";
import Hero from "./hero";

export default function Landing() {
  return (
    <div className="pb-10 lg:pb-20">
      <Hero />
      <Features />
    </div>
  );
}
