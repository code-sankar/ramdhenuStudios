import { motion, MotionConfig } from "motion/react";
import Atmosphere from "./components/ui/Atmosphere";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import TrustStrip from "./components/sections/TrustStrip";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Work from "./components/sections/Work";
import Results from "./components/sections/Results";
import Process from "./components/sections/Process";
import Pricing from "./components/sections/Pricing";
import Testimonials from "./components/sections/Testimonials";
import Contact from "./components/sections/Contact";

/**
 * RAMDHENU STUDIOS
 * ---------------------------------------------------------------------------
 * Section order follows the buying journey rather than a template:
 *
 *   Hero          Who are they, and what do I get?
 *   TrustStrip    Why should I keep reading?
 *   About         Who are they really — and why one team over five?
 *   Services      What exactly do they do?
 *   Work          Have they done good work?
 *   Results       Does it actually move the business?
 *   Process       How would this run?
 *   Pricing       What does it cost?
 *   Testimonials  Does anyone vouch for them?
 *   Contact       How do I start?
 */
export default function App() {
  return (
    /* reducedMotion="user" makes Motion drop transform animations for anyone
       who asks the OS for less movement, while keeping opacity fades — the CSS
       in index.css can only reach CSS animations, not these. */
    <MotionConfig reducedMotion="user">
      <Atmosphere />
      <Header />

      {/* Page-load fade — short enough to feel instant, long enough to settle */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <Hero />
        <TrustStrip />
        <About />
        <Services />
        <Work />
        <Results />
        <Process />
        <Pricing />
        <Testimonials />
        <Contact />
      </motion.main>

      <Footer />
    </MotionConfig>
  );
}
