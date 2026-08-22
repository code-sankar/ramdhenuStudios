import { Link } from "react-router-dom";

import Icon from "../components/Icon";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { notFoundSeo, servicePath } from "../data/seo";
import { services } from "../data/services";

/**
 * 404 — reached by an unknown path, or by a /services/<slug>/ that has no entry
 * in services.js.
 *
 * A dead end on a site whose whole job is enquiries is wasted attention, so
 * this is the services index rather than an apology: whatever they were looking
 * for, one of the six is probably it.
 */
export default function NotFoundPage() {
  return (
    <Layout skipTo="#not-found">
      <Seo meta={notFoundSeo()} />

      <section
        id="not-found"
        className="masthead field-fade grain relative overflow-hidden pb-[clamp(64px,9vw,120px)]"
      >

        <div className="shell relative">
          <p className="mb-4 flex items-center gap-3 font-display text-[13px] tracking-[0.1em] text-white">
            <span>404</span>
            <span aria-hidden="true" className="h-px w-8 bg-white/35" />
            <span>Page not found</span>
          </p>
          <h1 className="display text-white max-w-[18ch] text-[clamp(32px,5vw,64px)] leading-[1] tracking-[-0.022em]">
            That page isn&apos;t here
          </h1>
          <p className="mt-5 max-w-[52ch] text-[16.5px] leading-[1.6] text-white">
            It may have moved, or the address may have a typo in it. Everything we do is one of
            the six below.
          </p>

          <div className="mt-[clamp(28px,3.5vw,44px)] flex flex-wrap items-center gap-3 border-t border-white/25 pt-[clamp(24px,3vw,34px)]">
            <Link
              to="/"
              className="btn-on-field inline-flex items-center gap-[9px] rounded-full px-[26px] py-[15px] font-display text-[15px] no-underline"
            >
              <Icon name="arrowRight" size={15} />
              Back to the home page
            </Link>
          </div>
        </div>
      </section>

      <section className="section-y bg-lav-50">
        <div className="shell">
          <h2 className="display mb-[clamp(24px,3vw,40px)] text-[clamp(22px,2.8vw,34px)]">
            Our services
          </h2>
          <ul className="m-0 list-none border-t border-line p-0">
            {services.map((service) => (
              <li key={service.slug} className="border-b border-line">
                <Link
                  to={servicePath(service.slug)}
                  className="group flex items-center gap-[clamp(16px,3vw,40px)] py-5 no-underline"
                >
                  <span className="w-7 flex-none font-display text-[13px] text-coral-700">
                    {service.num}
                  </span>
                  <span className="flex-1 font-display text-[clamp(17px,2vw,26px)] uppercase transition-colors duration-150 group-hover:text-coral-700">
                    {service.title}
                  </span>
                  <span className="text-muted hidden max-w-[300px] flex-1 text-sm min-[900px]:block">
                    {service.blurb}
                  </span>
                  <span className="btn btn-icon btn-secondary pointer-events-none flex-none">
                    <Icon name="arrowRight" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
