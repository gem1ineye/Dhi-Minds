import { GoldRuleProvider } from "@/components/motion/GoldRule";
import { Hero } from "@/components/sections/Hero";
import { Trust } from "@/components/sections/Trust";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Capabilities } from "@/components/sections/Capabilities";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Contact } from "@/components/sections/Contact";

/** PRD §6.2 — fixed home page section order (FR-IA-01). */
export default function HomePage() {
  return (
    <>
      <GoldRuleProvider>
        <Hero />
        <Trust />
        <Services />
        <About />
        <Portfolio />
        <Process />
        <Capabilities />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </GoldRuleProvider>
      <Contact />
    </>
  );
}
