import About from "../components/About";
import Contact from "../components/Contact";
import Faq from "../components/Faq";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Orbit from "../components/Orbit";
import Seo from "../components/Seo";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import { homeSeo } from "../data/seo";

/**
 * HOME — built to the Industry design system (src/styles/industry.css).
 *
 * Section order follows the artboard:
 *   Hero          the tagline, at full field
 *   About         who we are, and what the team is made of
 *   Services      six disciplines, each opening onto the page that explains it
 *   Orbit         the same six as one system, so the list has an argument
 *   Testimonials  one voice at a time
 *   Contact       one ask, one action
 */
export default function HomePage() {
  return (
    <Layout skipTo="#about">
      <Seo meta={homeSeo()} />
      <Hero />
      <About />
      <Services />
      <Orbit />
      <Testimonials />
      <Faq />
      <Contact />
    </Layout>
  );
}
