import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

/**
 * RAMDHENU — built to the Industry design system (src/styles/industry.css).
 *
 * Section order follows the artboard:
 *   Hero          the tagline, at full field
 *   About         who we are, and what the team is made of
 *   Services      six disciplines, each opening onto the work that proves it
 *   Testimonials  one voice at a time
 *   Contact       one ask, one action
 */
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
