import { useEffect } from "react";
import { headTags } from "../data/seo";

/**
 * SEO — the page head, as a component.
 *
 * Each route renders `<Seo meta={…} />` with a description built in
 * src/data/seo.js, and this writes it into the document: title, description,
 * canonical, the social cards and the JSON-LD blocks.
 *
 * Every tag it owns is stamped `data-seo`, and the build stamps the same
 * attribute on the tags it writes into the HTML files. So on the first paint
 * the head is already right without JavaScript, and this replaces that set
 * wholesale — no duplicated canonical, no description left behind from the
 * previous route after a client-side navigation.
 *
 * It is an effect rather than tags rendered into the tree because those get
 * appended to whatever is already in the head; a second <title> would win or
 * lose by document order rather than by which route is showing.
 */
const OWNED = "data-seo";

export default function Seo({ meta }) {
  /* The meta object is rebuilt on every render, so identity is useless as a
     dependency — the serialised form is the thing that actually changes. */
  const serialised = JSON.stringify(meta);

  useEffect(() => {
    const next = JSON.parse(serialised);
    const { head } = document;

    head.querySelectorAll(`[${OWNED}]`).forEach((node) => node.remove());
    document.title = next.title;

    for (const { tag, attrs, text } of headTags(next)) {
      const el = document.createElement(tag);
      el.setAttribute(OWNED, "");
      for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value);
      if (text != null) el.textContent = text;
      head.appendChild(el);
    }
  }, [serialised]);

  return null;
}
