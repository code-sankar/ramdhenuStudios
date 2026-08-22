import Anatomy from "./Anatomy";
import Catchment from "./Catchment";
import Funnel from "./Funnel";
import Loop from "./Loop";
import Pipeline from "./Pipeline";
import Radiate from "./Radiate";

/**
 * FIGURE — one diagram per service, picked by name from its own data.
 *
 * Every service page gets a figure and no two are the same shape, because the
 * shape is the part that argues:
 *
 *   anatomy    six disciplines wired inward into one build      websites
 *   pipeline   four stages on a line that ends                  photo & video
 *   loop       five stages on a ring that does not              social
 *   funnel     four tiers, and most of the input falls away     paid ads
 *   catchment  a pin, its radius, and the searches inside it    Google Business
 *   radiate    one decision pushed outward onto six surfaces    branding
 *
 * `ServicePage` never learns any of that. It renders whatever the service's
 * `figure.kind` names, so adding a figure to a service is a data change and
 * adding a *new kind* of figure is one import here.
 */
const KINDS = {
  anatomy: Anatomy,
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
  return <Drawn nodes={spec.nodes} />;
}
