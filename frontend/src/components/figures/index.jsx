import Anatomy from "./Anatomy";
import Arc from "./Arc";
import Catchment from "./Catchment";
import Funnel from "./Funnel";
import Loop from "./Loop";
import Pipeline from "./Pipeline";
import Radiate from "./Radiate";

/**
 * FIGURE — one diagram, picked by name from its own data.
 *
 * Every service page gets one, and the home page's closing section takes the
 * seventh. No two are the same shape, because the shape is the part that
 * argues:
 *
 *   anatomy    six disciplines wired inward into one build      websites
 *   pipeline   four stages on a line that ends                  photo & video
 *   loop       five stages on a ring that does not              social
 *   funnel     four tiers, and most of the input falls away     paid ads
 *   catchment  a pin, its radius, and the searches inside it    Google Business
 *   radiate    one decision pushed outward onto six surfaces    branding
 *   arc        one beam in, four stages over, a spread on the    the home page
 *              far side
 *
 * `ServicePage` never learns any of that. It renders whatever the service's
 * `figure.kind` names, so adding a figure to a service is a data change and
 * adding a *new kind* of figure is one import here.
 */
const KINDS = {
  anatomy: Anatomy,
  arc: Arc,
  pipeline: Pipeline,
  loop: Loop,
  funnel: Funnel,
  catchment: Catchment,
  radiate: Radiate,
};

export default function Figure({ spec }) {
  if (!spec?.kind || !spec.nodes?.length) return null;
  const Drawn = KINDS[spec.kind];
  /* A typo in the data should cost the section, not the page. */
  if (!Drawn) return null;
  /* `foot` and `commitAt` are the arc's alone: the only figure whose drawing
     carries words that are not on a card, and the only one whose stroke
     changes partway along. Named rather than spread, so a stray key in a spec
     cannot quietly become a prop. */
  return <Drawn nodes={spec.nodes} foot={spec.foot} commitAt={spec.commitAt} />;
}
