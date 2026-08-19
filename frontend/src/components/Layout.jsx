import Footer from "./Footer";
import Header from "./Header";

/**
 * The chrome every route wears: the skip link, the sticky header, one <main>,
 * and the footer. Pages supply only their own sections.
 *
 * `skipTo` exists because "skip to content" should land past the opening
 * field, and what that is differs by page — the home page's first real content
 * is About, a service page's is the explanation under the masthead.
 */
export default function Layout({ skipTo = "#main", children }) {
  return (
    <>
      <a href={skipTo} className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
